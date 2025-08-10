import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import visaImage from './media/visa.JPG';
import styles from './styles/mms_final.module.css';

const Graf2: React.FC<{name: string}> = ({name}) => {
    const [currentStep, setCurrentStep] = useState(0);

    const textSteps = [
        "This is the first paragraph of scrolling text that will move over the visa image.",
        "As you scroll down, this text will continue to reveal more information about the visa process.",
    ];

    return (
            <div className={styles.grafSection}>
            <div className={styles.visaContainer}>
                <img src={visaImage} alt="Visa"/>
            </div>
            
            <Scrollama 
                onStepEnter={({data}) => setCurrentStep(data)}
                offset={0.5}>
                    {textSteps.map((text, index) => (
                        <Step key={index} data={index}>
                            <div className={styles.textBoxContainer}>
                                <p>{text}</p>
                            </div>
                        </Step>
                    ))}
            </Scrollama>
        </div>
    );
};

export default Graf2;
