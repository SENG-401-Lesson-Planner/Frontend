import React from 'react';

const PlanPage: React.FC = () => {
    return (
        <div className="page-container">
            <h1>Lesson Plan</h1>
            <form>
                <label htmlFor="lesson-plan">What is your lesson plan about?</label>
                <input type="text" id="lesson-plan" name="lesson-plan" />
            </form>
        </div>
    );
};

export default PlanPage;