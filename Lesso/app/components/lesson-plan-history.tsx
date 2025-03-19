import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; 

interface LessonPlan {
    response: string;
    created_at: string; 
}

interface LessonPlanHistoryProps {
    className?: string;
}

const LessonPlanHistory: React.FC<LessonPlanHistoryProps> = ({ className }) => {
    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const fetchLessonPlans = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await fetch('https://api.lesso.help/account/responsehistory', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': token,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch lesson plans');
                    }

                    const data = await response.json();
                    setLessonPlans(data);
                    setLoading(false);
                } catch (err: any) {
                    setError(err.message);
                    setLoading(false);
                }
            } else {
                setError('No authentication token found');
                setLoading(false);
            }
        };

        fetchLessonPlans();
    }, []);

    
    const toggleExpand = (index: number) => {
        setExpandedIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );
    };

    
    const extractTitle = (response: string): string => {
        const titleMatch = response.match(/\*\*Lesson Plan: (.*?)\*\*/);
        return titleMatch ? titleMatch[1] : 'Untitled Lesson Plan';
    };

    
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = async (response: string) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('No authentication token found');
            return;
        }

        try {
            const deleteResponse = await fetch('https://api.lesso.help/account/removereponse', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication': token,
                },
                body: JSON.stringify({ response }),
            });

            if (!deleteResponse.ok) {
                throw new Error('Failed to delete lesson plan');
            }

            
            setLessonPlans(prevLessonPlans => prevLessonPlans.filter(plan => plan.response !== response));
            setNotification('Lesson plan deleted successfully'); 
            setTimeout(() => setNotification(null), 3000); 
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading lesson plans...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    if (lessonPlans.length === 0) {
        return (
            <div 
                className={className} 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100%', 
                    color: 'white', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    padding: '20px', 
                    borderRadius: '10px',
                    textAlign: 'center',
                }}>
                No lesson plans available.
            </div>
        );
    }

    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {notification && (
                <div 
                    style={{
                        position: 'fixed',
                        top: '10px',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        zIndex: 1000,
                    }}>
                    {notification}
                </div>
            )}
            {lessonPlans.map((lessonPlan, index) => {
                const isExpanded = expandedIndices.includes(index);
                const title = extractTitle(lessonPlan.response);
                const date = formatDate(lessonPlan.created_at);

                return (
                    <div key={index} 
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            marginBottom: '5px', 
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                            color: 'white',
                        }}>
                        <div 
                            onClick={() => toggleExpand(index)} 
                            style={{ 
                                cursor: 'pointer', 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: 'calc(16px + 1vw)' }}>{title}</h3>
                                <p>{date}</p>
                            </div>
                            <span>{isExpanded ? '▲' : '▼'}</span>
                        </div>

                        <div 
                            style={{ 
                                height: isExpanded ? 'auto' : '0px',  
                                overflow: 'hidden', 
                                transition: 'height 0.3s ease-in-out', 
                            }}>
                            <div style={{ paddingTop: '10px' }}>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: marked(lessonPlan.response) }} 
                                />
                            </div>
                        </div>
                        <button 
                            onClick={() => handleDelete(lessonPlan.response)} 
                            style={{
                                marginTop: '10px',
                                padding: '8px 12px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}>
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonPlanHistory;
