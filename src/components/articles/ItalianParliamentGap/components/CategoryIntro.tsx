import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CategoryIntroProps {
    icon: IconDefinition;
    title: string;
}

const CategoryIntro: React.FC<CategoryIntroProps> = ({ icon, title }) => {
    return (
        <div className='category-intro-container'>
            <span className='background-icon'>
                <FontAwesomeIcon icon={icon} size='10x'/>
            </span>
            <div className='category-intro-text'>
                <h2>{title}</h2>
            </div>
        </div>
    );
};

export default CategoryIntro; 