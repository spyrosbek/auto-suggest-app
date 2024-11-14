import React from 'react';

export function highlightText(text: string | undefined, query: string | undefined): React.ReactNode {
    if (!text) return null; // Return null if text is undefined
    if (!query) return text; // Return original text if query is undefined or empty

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="highlighted-text" data-testid="highlighted-text">
                {part}
            </span>
        ) : (
            part
        )
    );
}
