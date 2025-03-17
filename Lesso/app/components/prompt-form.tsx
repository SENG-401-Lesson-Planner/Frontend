import React, { useState, useEffect } from 'react';

const PromptForm: React.FC = () => {
    const [grade, setGrade] = useState(1);
    const [lessonPlan, setLessonPlan] = useState('');
    const [error, setError] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [customSubject, setCustomSubject] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [time, setTime] = useState('');

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

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
            setTime(value);
        }
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
        console.log(`Selected Subject: ${selectedSubject || customSubject}`);
        console.log(`Time of Lesson: ${time}`);
    };

    const getGradeLabel = (value: number) => {
        if (value >= 1 && value <= 12) {
            return value.toString();
        } else if (value === 13) {
            return 'Post Secondary';
        } else {
            return '';
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-transparent rounded-lg shadow-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <h1 className="text-2xl text-center text-white font-bold mb-4">Lesson Plan Creator</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="lesson-plan" className="block text-sm font-medium text-white mb-2">What is your lesson plan about?</label>
                <input type="text" id="lesson-plan" name="lesson-plan" value={lessonPlan} onChange={handleLessonPlanChange} className="block w-full text-white p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]" />
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <fieldset className="mb-2">
                    <legend className="text-sm font-medium text-white mb-2">What grade is the lesson plan for?</legend>
                    <input type="range" min="1" max="13" step="1" value={grade.toString()} onChange={handleGradeChange} className="w-full custom-range" style={{ accentColor: '#b35786'}} />
                    <div className="text-white mt-2 text-center">
                        {getGradeLabel(Math.round(grade))}
                    </div>
                </fieldset>
                <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">Subject (Optional)</label>
                <div className="flex flex-wrap justify-center mb-8 gap-2">
                    {['Math', 'Science', 'English', 'Social Studies', 'Art', 'Physical Education'].map((subject, index) => (
                        <div key={index} className="w-1/4 flex justify-center mb-2">
                            <button
                                type="button"
                                className={`w-full px-4 py-2 rounded-md ${selectedSubject === subject ? 'bg-[#44264E] text-[#b35786]' : 'bg-[#b35786] text-[#44264E]'} hover:bg-[#44264E] hover:text-white`}
                                onClick={() => {
                                    setSelectedSubject(subject);
                                    setCustomSubject('');
                                    setShowCustomInput(false);
                                }}
                            >
                                {subject}
                            </button>
                        </div>
                    ))}
                    <div className="w-1/4 flex justify-center mb-2">
                        <button
                            type="button"
                            className={`w-full px-4 py-2 rounded-md ${customSubject ? 'bg-[#44264E] text-[#b35786]' : 'bg-[#b35786] text-[#44264E]'} hover:bg-[#44264E] hover:text-white`}
                            onClick={() => {
                                setShowCustomInput(true);
                                setSelectedSubject('');
                            }}
                        >
                            {customSubject || 'Other'}
                        </button>
                    </div>
                </div>
                {showCustomInput && (
                    <div className="mb-8">
                        <label htmlFor="custom-subject" className="block text-sm font-medium text-white mb-2">Enter Subject</label>
                        <input
                            type="text"
                            id="custom-subject"
                            value={customSubject}
                            onChange={(e) => setCustomSubject(e.target.value)}
                            className="block w-full text-white p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]"
                        />
                    </div>
                )}
                <label htmlFor="time" className="block text-sm font-medium text-white mb-2">Lesson Length (Minutes)</label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="block w-full text-white p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-[#44264E] focus:border-[#44264E]"
                />
                <div className="flex justify-center">
                    <button type="submit" className="px-4 py-2 text-c bg-white text-[#44264E] rounded-md hover:bg-[#44264E] hover:text-white">Get Lesson Plan</button>
                </div>
            </form>
        </div>
    );
};

export default PromptForm;