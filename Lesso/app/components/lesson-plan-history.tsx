import React, { useState, useEffect } from 'react';
import { marked } from 'marked'; // Import marked library to render Markdown

interface LessonPlan {
    response: string; // The Markdown-formatted lesson plan
    created_at: string; // The timestamp
}

interface LessonPlanHistoryProps {
    className?: string;
}

const LessonPlanHistory: React.FC<LessonPlanHistoryProps> = ({ className }) => {
    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    // Toggle the expansion of the lesson plan's content
    const toggleExpand = (index: number) => {
        setExpandedIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );
    };

    // Extract the title from the Markdown response
    const extractTitle = (response: string): string => {
        const titleMatch = response.match(/\*\*Lesson Plan: (.*?)\*\*/);
        return titleMatch ? titleMatch[1] : 'Untitled Lesson Plan';
    };

    // Format the date to a readable string
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    if (loading) {
        return <div>Loading lesson plans...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
                        {/* Header Section */}
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

                        {/* Expanded Content */}
                        <div 
                            style={{ 
                                height: isExpanded ? 'auto' : '0px',  // Allow the content to expand naturally
                                overflow: 'hidden', 
                                transition: 'height 0.3s ease-in-out', // Smooth transition for expansion
                            }}>
                            <div style={{ paddingTop: '10px' }}>
                                <div 
                                    dangerouslySetInnerHTML={{ __html: marked(lessonPlan.response) }} // Render Markdown as HTML
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonPlanHistory;
