import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import Logo from '~/components/logo';
import PromptButton from '~/components/prompt-button';
import LogoutButton from '~/components/logout-button';

interface LessonPlan {
    title: string;
    date: string;
    message: string;
}

const LessonPlanHistory: React.FC<{ className?: string }> = ({ className }) => {
    const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>([]);
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLessonPlans = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('No access token found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://api.lesso.help/account/responsehistory', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${token}` }, // Fixed header
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch lesson plans');
                }

                const data = await response.json();
                const formattedLessons = data.map((item: any) => ({
                    title: item.response.split('\n')[0].replace('**Lesson Plan: ', '').replace('**', ''),
                    date: new Date(item.created_at).toLocaleDateString(),
                    message: marked(item.response), // Format using marked
                }));

                setLessonPlans(formattedLessons);
            } catch (err) {
                setError((err as Error).message);
            } finally {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {lessonPlans.map((lessonPlan, index) => {
                const isExpanded = expandedIndices.includes(index);
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
                                <h3 style={{ fontSize: 'calc(16px + 1vw)' }}>{lessonPlan.title}</h3>
                                <p>{lessonPlan.date}</p>
                            </div>
                            <span>{isExpanded ? '▲' : '▼'}</span>
                        </div>

                        {isExpanded && (
                            <div style={{ paddingTop: '10px' }}>
                                <div dangerouslySetInnerHTML={{ __html: lessonPlan.message }} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default function History() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setUsername(null);
                return;
            }

            try {
                const response = await fetch('https://api.lesso.help/account/isloggedin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('User is not logged in');
                }

                const loggedInUsername = await response.text();
                setUsername(loggedInUsername);
            } catch (error) {
                console.error('Error checking login status:', error);
                localStorage.removeItem('accessToken'); // Remove token if invalid
                setUsername(null);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUsername(null);
        window.location.href = '/';
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Logo />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '10px' }}>
                    {username && (
                        <span className="text-white" style={{ fontSize: '1.5rem' }}>{username}</span>
                    )}
                    <PromptButton />
                    {username && <LogoutButton onClick={handleLogout} />}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '60%' }}>
                    <LessonPlanHistory />
                </div>
            </div>
        </div>
    );
}
