import React from 'react';
import MarkdownContent from './MarkdownContent';

interface IntroProps {
    title: string;
    descriptionSrc: string;
}

const Intro: React.FC<IntroProps> = ({ title, descriptionSrc }) => {
    return (
        <header className='header'>
            <h1 className='header-title'>{title}</h1>
            <MarkdownContent src={descriptionSrc} className='header-description'/>
        </header>
    );
};

export default Intro; 