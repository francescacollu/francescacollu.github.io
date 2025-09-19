import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf, faMarsAndVenus, faGraduationCap, faEarthEurope } from '@fortawesome/free-solid-svg-icons';

const CategoriesIcon: React.FC = () => {
    return (
        <div className="category-four-icons-container">
            <div className="category-icon-container">
                <div className="category-icon">
                    <FontAwesomeIcon icon={faMarsAndVenus} size="3x" />
                    <p>Gender</p>
                </div>
            </div>
            <div className="category-icon-container">
                <div className="category-icon">
                    <FontAwesomeIcon icon={faHourglassHalf} size='3x'/>
                    <p>Age</p>
                </div>
            </div>
            <div className="category-icon-container">
                <div className="category-icon">
                    <FontAwesomeIcon icon={faGraduationCap} size='3x'/>
                    <p>Education</p>
                </div>
            </div>
            <div className="category-icon-container">
                <div className="category-icon">
                    <FontAwesomeIcon icon={faEarthEurope} size='3x'/>
                    <p>Geographic Origin</p>
                </div>
            </div>
        </div>
    );
};

export default CategoriesIcon; 