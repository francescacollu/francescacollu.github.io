import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';

const ScrollDemo: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);

  const onStepEnter = ({ data }: { data: number }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div style={{ margin: '50vh 0', border: '2px dashed #3498db' }}>
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef'
      }}>
        <div style={{ 
          fontSize: '2rem',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: currentStepIndex === null ? '#e9ecef' : '#3498db',
          color: 'white',
          borderRadius: '8px',
          transition: 'all 0.3s ease'
        }}>
          {currentStepIndex === null 
            ? 'Scroll to begin' 
            : `Section ${currentStepIndex + 1}`}
        </div>
      </div>
      <Scrollama onStepEnter={onStepEnter} offset={0.5}>
        {[0, 1, 2, 3].map((stepIndex) => (
          <Step data={stepIndex} key={stepIndex}>
            <div
              style={{
                margin: '50vh 0',
                padding: '2rem',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                opacity: currentStepIndex === stepIndex ? 1 : 0.2,
                transition: 'opacity 0.3s ease'
              }}
            >
              <h2>Section {stepIndex + 1}</h2>
              <p>This is the content for section {stepIndex + 1}. 
                 Scroll to see how the sticky element changes.</p>
            </div>
          </Step>
        ))}
      </Scrollama>
    </div>
  );
};

export default ScrollDemo; 