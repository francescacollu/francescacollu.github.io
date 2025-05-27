import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
    src: string;
    className?: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ src, className }) => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(setContent);
    }, [src]);

    return (
        <div className={className}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownContent; 