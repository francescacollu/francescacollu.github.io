import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import ItalyMap from './ItalyMap';
import MarkdownContent from './MarkdownContent';
import '../styles/ItalianParliamentGap.css';

interface MapSectionProps {
    offset?: number;
}

const MapSection: React.FC<MapSectionProps> = ({ 
    offset = 0.5 
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className='scrollytelling-section-container'>
            <div className='italy-map-container'>
                <div className='italy-map-container-inner'>
                    <ItalyMap 
                        width="50%" 
                        height="100%" 
                        dataPath="/data/region_comparison_analysis.csv" 
                        currentStep={currentStep}
                    />
                </div>
            </div>
            
            <div className='scrolling-text-boxes-container'>
                <Scrollama 
                    onStepEnter={({data}) => setCurrentStep(data)}
                    offset={offset}
                >
                    <Step data={0}>
                        <div className='right-text-box-container'>
                            <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step1.md' className='text-box-inner'/>
                        </div>
                    </Step>
                    
                    <Step data={1}>
                        <div className='right-text-box-container'>
                            <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step2.md' className='text-box-inner'/>
                        </div>
                    </Step>
                    
                    <Step data={2}>
                        <div className='right-text-box-container'>
                            <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step3.md' className='text-box-inner'/>
                        </div>
                    </Step>

                    <Step data={3}>
                        <div className='right-text-box-container'>
                            <MarkdownContent src='/content/ItalianParliamentGap/origin/origin_step4.md' className='text-box-inner'/>
                        </div>
                    </Step>
                </Scrollama>
            </div>
        </div>
    );
};

export default MapSection; 