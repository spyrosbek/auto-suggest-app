import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryListItem from './StoryListItem.tsx';

describe('StoryListItem', () => {
    const mockStory = {
        id: 1,
        title: 'Test Story',
        url: 'https://example.com',
        points: 100,
        author: 'testuser',
        created_at: '2023-01-01T00:00:00.000Z'
    };

    const mockOnSave = jest.fn();
    const mockOnDelete = jest.fn();

    it('renders story details correctly', () => {
        render(
            <StoryListItem
                story={mockStory}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText(mockStory.title)).toBeInTheDocument();
        expect(screen.getByText(mockStory.author)).toBeInTheDocument();
        expect(screen.getByText('100 points')).toBeInTheDocument();
    });

    it('calls onSave when save button is clicked', () => {
        render(
            <StoryListItem
                story={mockStory}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);

        expect(mockOnSave).toHaveBeenCalledWith(mockStory);
    });

    it('calls onDelete when delete button is clicked', () => {
        render(
            <StoryListItem
                story={mockStory}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith(mockStory.id);
    });

    it('handles null story data gracefully', () => {
        const incompleteStory = {
            id: 1,
            title: 'Test Story',
            // Missing other fields
        };

        render(
            <StoryListItem
                story={incompleteStory}
                onSave={mockOnSave}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText('Test Story')).toBeInTheDocument();
        // Verify that the component doesn't crash with missing data
        expect(screen.queryByText('undefined points')).not.toBeInTheDocument();
    });
});