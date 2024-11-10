import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryListItem from './StoryListItem';
import { Story } from '../../../types/Story';
import { highlightText } from "../../../utils/highlightText";

// Mock the highlightText function
jest.mock('../../../utils/highlightText', () => ({
    highlightText: jest.fn((text) => text),
}));

describe('StoryListItem', () => {
    const mockStory: Story = {
        id: '1',
        title: 'Test Story',
        url: 'https://example.com',
        points: 100,
        author: 'testuser',
        commentsNumber: 10,
    };

    const mockHandleClick = jest.fn();

    it('renders story details correctly for SEARCH scope', () => {
        render(
            <StoryListItem
                query=""
                scope="SEARCH"
                story={mockStory}
                handleClick={mockHandleClick}
            />
        );

        expect(screen.getByText(mockStory.title)).toBeInTheDocument();
        expect(screen.getByText('100 points | by testuser | 10 comments')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', mockStory.url);
        expect(screen.getByRole('button')).toBeInTheDocument(); // FavoriteButton
    });

    it('renders story details correctly for FAVORITES scope', () => {
        render(
            <StoryListItem
                query=""
                scope="FAVORITES"
                story={mockStory}
                handleClick={mockHandleClick}
            />
        );

        expect(screen.getByText(mockStory.title)).toBeInTheDocument();
        expect(screen.getByText('100 points | by testuser | 10 comments')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', mockStory.url);
        expect(screen.getByRole('button')).toBeInTheDocument(); // DeleteButton
    });

    it('calls handleClick when FavoriteButton is clicked in SEARCH scope', () => {
        render(
            <StoryListItem
                query=""
                scope="SEARCH"
                story={mockStory}
                handleClick={mockHandleClick}
            />
        );

        const favoriteButton = screen.getByRole('button');
        fireEvent.click(favoriteButton);

        expect(mockHandleClick).toHaveBeenCalledWith(mockStory);
    });

    it('calls handleClick when DeleteButton is clicked in FAVORITES scope', () => {
        render(
            <StoryListItem
                query=""
                scope="FAVORITES"
                story={mockStory}
                handleClick={mockHandleClick}
            />
        );

        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);

        expect(mockHandleClick).toHaveBeenCalledWith(mockStory);
    });

    it('highlights text when query is provided', () => {
        render(
            <StoryListItem
                query="Test"
                scope="SEARCH"
                story={mockStory}
                handleClick={mockHandleClick}
            />
        );

        expect(highlightText).toHaveBeenCalledWith(mockStory.title, 'Test');
    });

    // it('handles missing story title', () => {
    //     const storyWithoutTitle = { ...mockStory, title: undefined };
    //     render(
    //         <StoryListItem
    //             query=""
    //             scope="SEARCH"
    //             story={storyWithoutTitle as Partial<Story>}
    //             handleClick={mockHandleClick}
    //         />
    //     );
    //
    //     expect(screen.getByText('__Missing_Story_Title__')).toBeInTheDocument();
    // });
});