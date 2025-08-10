import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import styles from './styles/mms_final.module.css';

interface ImageGrafProps {
    text: string;
    image: string[];
    caption: string;
    textPosition?: 'left' | 'right';
    offset?: number;
}

const ImageGraf: React.FC<ImageGrafProps> = ({ 
    text, 
    image,
    caption, 
    textPosition = 'left', 
    offset = 0.5 
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={styles.grafSection}>
            {/* Sticky text container */}
            <div className={`${textPosition === 'left' ? styles.leftTextBoxContainerImageGraf : styles.rightTextBoxContainerImageGraf}`}>
                <div className={styles.textBoxInner}>
                    <p>{text}</p>
                </div>
            </div>
            
            {/* Scrollama with images as steps */}
            <Scrollama 
                onStepEnter={({data}) => setCurrentStep(data)}
                offset={offset}>
                <Step data={0}>
                    <div className={styles.imageStepParent}>
                        <div className={styles.imageStepContainer}>
                            <img src={image[0]} alt={`Step ${0 + 1}`} />
                        </div>
                        <p>{caption}</p>
                    </div>
                </Step>
            </Scrollama>
        </div>
    );
};

export default ImageGraf;
