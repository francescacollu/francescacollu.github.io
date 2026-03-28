import React, { useEffect, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';

interface MarkdownContentProps {
    src: string;
    className?: string;
}

function isExternalAbsoluteHref(href: string | undefined): boolean {
    if (!href || href.startsWith('#')) return false;
    return /^https?:\/\//i.test(href) || href.startsWith('//');
}

const markdownComponents: Components = {
    a({ href, children, ...props }) {
        const external = isExternalAbsoluteHref(href);
        return (
            <a
                href={href}
                {...props}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
                {children}
            </a>
        );
    },
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ src, className }) => {
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(setContent);
    }, [src]);

    return (
        <div className={className}>
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownContent; 