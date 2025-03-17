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

const LessonPlanHistory: React.FC = () => {
    const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndices(prevIndices =>
            prevIndices.includes(index)
                ? prevIndices.filter(i => i !== index)
                : [...prevIndices, index]
        );
    };

    return (
        <div>
            {lessonPlans.map((lessonPlan, index) => (
                <div key={index}>
                    <div onClick={() => toggleExpand(index)} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}>
                        <h3>{lessonPlan.title}</h3>
                        <p>{lessonPlan.date}</p>
                    </div>
                    {expandedIndices.includes(index) && (
                        <div style={{ padding: '10px', border: '1px solid #ccc', marginBottom: '10px' }}>
                            <p>{lessonPlan.message}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LessonPlanHistory;