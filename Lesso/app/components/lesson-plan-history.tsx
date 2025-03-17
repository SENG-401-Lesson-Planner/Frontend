import React, { useState } from 'react';

interface LessonPlan {
    title: string;
    date: string;
    message: string;
}

const lessonPlans: LessonPlan[] = [
    {
        title: 'Lesson 1',
        date: '2023-10-01',
        message: 'This is the detailed message for Lesson 1.',
    },
    {
        title: 'Lesson 2',
        date: '2023-10-02',
        message: 'This is the detailed message for Lesson 2.',
    },
];

interface LessonPlanHistoryProps {
    className?: string;
}

const LessonPlanHistory: React.FC<LessonPlanHistoryProps> = ({ className }) => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );
    };

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
                                <h3 style={{ fontSize: 'calc(16px + 1vw)' }}>{lessonPlan.title}</h3>
                                <p>{lessonPlan.date}</p>
                            </div>
                            <span>{isExpanded ? '▲' : '▼'}</span>
                        </div>

                        
                        <div 
                            style={{ 
                                maxHeight: isExpanded ? '100px' : '0px', 
                                overflow: 'hidden', 
                                transition: 'max-height 0.3s ease-in-out', 
                            }}>
                            <div style={{ paddingTop: '10px' }}>
                                <p>{lessonPlan.message}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default LessonPlanHistory;
