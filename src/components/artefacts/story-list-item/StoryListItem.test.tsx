import { render, screen, fireEvent } from '@testing-library/react';
import StoryListItem from './StoryListItem';
import { Story } from '../../../types/Story';

describe('StoryListItem', () => {
    const mockStory: Story = {
        id: '123',
        title: 'Test Story',
        url: 'https://example.com',
        points: 100,
        author: 'test_author',
        commentsNumber: 5,
    };

    const handleClick = jest.fn();

    test('renders StoryListItem with title, subtitle, and links', () => {
        render(<StoryListItem story={mockStory} scope="SEARCH" handleClick={handleClick} />);

        expect(screen.getByText('Test Story')).toBeInTheDocument();
        expect(screen.getByText('100 points')).toBeInTheDocument();
        expect(screen.getByText('by test_author')).toBeInTheDocument();
        expect(screen.getByText('5 comments')).toBeInTheDocument();
    });

    test('calls handleClick on DeleteButton in FAVORITES scope', () => {
        render(<StoryListItem story={mockStory} scope="FAVORITES" handleClick={handleClick} />);

        const deleteButton = screen.getByRole('button', { name: /delete/i });
        fireEvent.click(deleteButton);

        expect(handleClick).toHaveBeenCalledWith(mockStory);
    });

    test('calls handleClick on FavoriteButton in SEARCH scope', () => {
        render(<StoryListItem story={mockStory} scope="SEARCH" handleClick={handleClick} />);

        const favoriteButton = screen.getByRole('button', { name: /favorite/i });
        fireEvent.click(favoriteButton);

        expect(handleClick).toHaveBeenCalledWith(mockStory);
    });
});
