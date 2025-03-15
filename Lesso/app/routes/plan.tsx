import React from 'react';
import PromptForm from '~/components/prompt-form';
import Logo from '~/components/logo'; // Import the Logo component

const PlanPage: React.FC = () => {
    return (
        <div>
            <div className="absolute top-0 left-0 m-4">
                <Logo /> 
            </div>
            <PromptForm />
        </div>
    );
};

export default PlanPage;