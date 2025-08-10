import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import styles from './styles/mms_final.module.css';

interface AlternatingSectionProps {
    text1: string;
    text2: string;
    image1: string;
    image2: string;
    offset?: number;
}

const AlternatingSection: React.FC<AlternatingSectionProps> = ({ 
    text1, 
    text2, 
    image1, 
    image2, 
    offset = 0.5 
}) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className={styles.alternatingSection}>
            {/* Sticky container that accumulates all elements */}
            <div className={styles.alternatingStickyContainer}>
                {/* Text 1 - appears and sticks when step >= 0 */}
                {currentStep >= 0 && (
                    <div className={styles.stickyTextLeft}>
                        <div className={styles.textBoxInner}>
                            <p>{text1}</p>
                        </div>
                    </div>
                )}
                
                {/* Image 1 - appears and sticks when step >= 1 */}
                {currentStep >= 1 && (
                    <div className={styles.stickyImageRight}>
                        <img src={image1} alt="First image" />
                    </div>
                )}
                
                {/* Text 2 - appears and sticks when step >= 2 */}
                {currentStep >= 2 && (
                    <div className={styles.stickyTextRight}>
                        <div className={styles.textBoxInner}>
                            <p>{text2}</p>
                        </div>
                    </div>
                )}
                
                {/* Image 2 - appears and sticks when step >= 3 */}
                {currentStep >= 3 && (
                    <div className={styles.stickyImageLeft}>
                        <img src={image2} alt="Second image" />
                    </div>
                )}
            </div>

            {/* Scrollama steps - each creates scrolling space to trigger elements */}
            <Scrollama 
                onStepEnter={({data}) => setCurrentStep(data)}
                offset={offset}
            >
                <Step data={0}>
                    <div className={styles.alternatingScrollStep}>
                        {/* Scroll space for text 1 */}
                    </div>
                </Step>
                <Step data={1}>
                    <div className={styles.alternatingScrollStep}>
                        {/* Scroll space for image 1 */}
                    </div>
                </Step>
                <Step data={2}>
                    <div className={styles.alternatingScrollStep}>
                        {/* Scroll space for text 2 */}
                    </div>
                </Step>
                <Step data={3}>
                    <div className={styles.alternatingScrollStep}>
                        {/* Scroll space for image 2 */}
                    </div>
                </Step>
                <Step data={4}>
                    <div className={styles.alternatingScrollStep}>
                        {/* Scroll space for image 2 */}
                    </div>
                </Step>
            </Scrollama>
        </div>
    );
};

export default AlternatingSection;
