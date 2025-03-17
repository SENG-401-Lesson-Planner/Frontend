import React from 'react';
import LessonPlanHistory from '../components/lesson-plan-history';
import Logo from '~/components/logo';

export default function History() {

  return (
    <div>
      <Logo />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '60%' }}>
          <LessonPlanHistory />
        </div>
      </div>
    </div>
  );
}
