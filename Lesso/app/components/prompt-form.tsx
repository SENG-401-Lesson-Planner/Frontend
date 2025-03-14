import React from 'react';

const PromptForm: React.FC = () => {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Lesson Plan Creator</h1>
            <form>
                <label htmlFor="lesson-plan" className="block text-sm font-medium text-gray-700 mb-2">What is your lesson plan about?</label>
                <input type="text" id="lesson-plan" name="lesson-plan" className="block w-full p-2 border border-gray-300 rounded-md mb-4" />
                <fieldset className="mb-4">
                    <legend className="text-sm font-medium text-gray-700 mb-2">What grade is the lesson plan for?</legend>
                    <label className="block mb-2">
                        <input type="radio" name="grade" value="1-3" className="mr-2" /> 1-3
                    </label>
                    <label className="block mb-2">
                        <input type="radio" name="grade" value="4-6" className="mr-2" /> 4-6
                    </label>
                    <label className="block mb-2">
                        <input type="radio" name="grade" value="7-9" className="mr-2" /> 7-9
                    </label>
                    <label className="block mb-2">
                        <input type="radio" name="grade" value="10-12" className="mr-2" /> 10-12
                    </label>
                    <label className="block mb-2">
                        <input type="radio" name="grade" value="post-university" className="mr-2" /> Post University
                    </label>
                </fieldset>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Get Lesson Plan</button>
            </form>
        </div>
    );
};

export default PromptForm;