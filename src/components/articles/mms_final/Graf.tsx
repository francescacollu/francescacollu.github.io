import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import styles from './styles/mms_final.module.css';

interface GrafProps {
    name: string;
    image: string;
    caption: string;
    textSteps: string[];
    position?: 'left' | 'right';
    offset?: number;
}

const Graf: React.FC<GrafProps> = ({ name, image, caption, textSteps, position = 'left', offset = 0.5 }) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={styles.grafSection}>
            <div className={styles.imageParent}>    
                <div className={styles.imgContainer}>
                    <img src={image} alt={name} />
                </div>
                <p>{caption}</p>
            </div>
            
            <Scrollama 
                onStepEnter={({data}) => setCurrentStep(data)}
                offset={offset}>
                    {textSteps.map((text, index) => (
                        <Step key={index} data={index}>
                            <div className={`${position === 'left' ? styles.leftTextBoxContainer : styles.rightTextBoxContainer}`}>
                                <div className={styles.textBoxInner}>
                                    <p>{text}</p>
                                </div>
                            </div>
                        </Step>
                    ))}
            </Scrollama>
        </div>
    );
};

export default Graf;
