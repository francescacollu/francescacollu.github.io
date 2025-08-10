import React from 'react';
import styles from './styles/mms_final.module.css';

const Headline: React.FC = () => {
    return (
        <div className={styles.headlineBackground}>
            <div className={styles.headlineSection}>
                <h1>When Immigration Law Forces Women Out of Work</h1>
                <p>By Francesca Collu</p>
            </div>
        </div>
    );
};

export default Headline;
