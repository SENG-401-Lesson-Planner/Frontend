import React, { useState, useEffect } from 'react';

const PromptForm: React.FC = () => {
    const [grade, setGrade] = useState(1);
    const [lessonPlan, setLessonPlan] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGrade(Number(event.target.value));
    };

    const handleLessonPlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLessonPlan(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!lessonPlan.trim()) {
            setError('Lesson plan message cannot be empty.');
            return;
        }
        setError('');
        console.log(`Lesson Plan: ${lessonPlan}`);
        console.log(`Grade Range: ${getGradeLabel(Math.round(grade))}`);
    };

    const getGradeLabel = (value: number) => {
        switch (value) {
            case 1: return '1-3';
            case 2: return '4-6';
            case 3: return '7-9';
            case 4: return '10-12';
            case 5: return 'Post Secondary';
            default: return '';
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-transparent rounded-lg shadow-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <h1 className="text-2xl text-center text-white font-bold mb-4">Lesson Plan Creator</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="lesson-plan" className="block text-sm font-medium text-white mb-2">What is your lesson plan about?</label>
                <input type="text" id="lesson-plan" name="lesson-plan" value={lessonPlan} onChange={handleLessonPlanChange} className="block w-full text-white p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]" />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <fieldset className="mb-4">
                    <legend className="text-sm font-medium text-white mb-2">What grade is the lesson plan for?</legend>
                    <input type="range" min="1" max="5" step="0.001" value={grade} onChange={handleGradeChange} className="w-full custom-range" />
                    <div className="text-white mt-2 text-center">
                        {getGradeLabel(Math.round(grade))}
                    </div>
                </fieldset>
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 text-c bg-white text-[#44264E] rounded-md hover:bg-[#44264E] hover:text-white">Get Lesson Plan</button>
                </div>
            </form>
        </div>
    );
};

export default PromptForm;