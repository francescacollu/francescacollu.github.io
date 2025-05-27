import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Parliament from './Parliament';
import MarkdownContent from './MarkdownContent';
import { Category } from '../types';
import '../styles/ItalianParliamentGap.css';

interface ChartStep {
    categories: Category[];
}

interface ParliamentSectionProps {
    chartSteps: ChartStep[];
    steps: {
        data: number;
        src: string;
        position: 'left' | 'right';
    }[];
    offset?: number;
}

const ParliamentSection: React.FC<ParliamentSectionProps> = ({ 
    chartSteps,
    steps, 
    offset = 0.5 
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className='scrollytelling-section-container'>
            <div className='chart-container'>
                <div className='chart-container-inner'>
                    <Parliament categories={chartSteps[currentStep].categories} />
                </div>
            </div>
            
            <div className='scrolling-text-boxes-container'>
                <Scrollama 
                    onStepEnter={({data}) => setCurrentStep(data)}
                    offset={offset}
                >
                    {steps.map((step, index) => (
                        <Step key={index} data={step.data}>
                            <div className={`${step.position}-text-box-container`}>
                                <MarkdownContent src={step.src} className='text-box-inner'/>
                            </div>
                        </Step>
                    ))}
                </Scrollama>
            </div>
        </div>
    );
};

export default ParliamentSection; 