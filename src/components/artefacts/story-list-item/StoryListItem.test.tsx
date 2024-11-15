import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StoryListItem from './StoryListItem';
import { Story } from '../../../types/Story';

jest.mock('./story-list-item.scss');

const mockStore = configureStore([]);

describe('StoryListItem', () => {
    const mockStory: Story = {
        id: '1',
        title: 'Test Story',
        url: 'https://example.com',
        author: 'Test Author',
        points: 100,
        commentsNumber: 10,
    };

    const mockHandleClick = jest.fn();

    const renderWithRedux = (
        component: React.ReactElement,
        { initialState = { favorites: { favorites: [] } } } = {}
    ) => {
        const store = mockStore(initialState);
        return render(<Provider store={store}>{component}</Provider>);
    };

    it('renders story details correctly', () => {
        renderWithRedux(<StoryListItem scope="SEARCH" story={mockStory} handleClick={mockHandleClick} />);

        expect(screen.getByText('Test Story')).toBeInTheDocument();
        expect(screen.getByText('100 points | by Test Author | 10 comments')).toBeInTheDocument();
    });

    it('renders a link to the story URL', () => {
        renderWithRedux(<StoryListItem scope="SEARCH" story={mockStory} handleClick={mockHandleClick} />);

        const link = screen.getByRole('link', { name: 'Test Story' });
        expect(link).toHaveAttribute('href', 'https://example.com');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders FavoriteButton when scope is SEARCH', () => {
        renderWithRedux(<StoryListItem scope="SEARCH" story={mockStory} handleClick={mockHandleClick} />);

        expect(screen.getByTestId('favorite-button')).toBeInTheDocument();
    });

    it('renders DeleteButton when scope is FAVORITES', () => {
        renderWithRedux(<StoryListItem scope="FAVORITES" story={mockStory} handleClick={mockHandleClick} />);

        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    });

    it('calls handleClick when FavoriteButton is clicked', () => {
        renderWithRedux(<StoryListItem scope="SEARCH" story={mockStory} handleClick={mockHandleClick} />);

        const favoriteButton = screen.getByTestId('favorite-button');
        fireEvent.click(favoriteButton);

        expect(mockHandleClick).toHaveBeenCalledWith(mockStory);
    });

    it('calls handleClick when DeleteButton is clicked', () => {
        renderWithRedux(<StoryListItem scope="FAVORITES" story={mockStory} handleClick={mockHandleClick} />);

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);

        expect(mockHandleClick).toHaveBeenCalledWith(mockStory);
    });

    it('highlights text when query is provided', async () => {
        const query = 'Test';
        renderWithRedux(<StoryListItem scope="SEARCH" story={mockStory} handleClick={mockHandleClick} query={query} />);

        const highlightedText = await screen.findByTestId('highlighted-text');
        expect(highlightedText).toBeInTheDocument();
        expect(highlightedText).toHaveTextContent('Test');
    });

    it('displays fallback text when story title is missing', () => {
        const storyWithoutTitle = { ...mockStory, title: '' };
        renderWithRedux(<StoryListItem scope="SEARCH" story={storyWithoutTitle} handleClick={mockHandleClick} />);

        expect(screen.getByText('__Missing_Story_Title__')).toBeInTheDocument();
    });
});