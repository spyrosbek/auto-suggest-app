import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchStories from './SearchStories';
import hackerNewsApi from '../../../api/hackerNewsApi.ts';

// Mock the hackerNewsApi
jest.mock('../../../api/hackerNewsApi');

const mockStore = configureStore([]);

describe('SearchStories', () => {
    const renderWithRedux = (
        component: React.ReactElement,
        { initialState = { favorites: { favorites: [] } } } = {}
    ) => {
        const store = mockStore(initialState);
        return render(<Provider store={store}>{component}</Provider>);
    };

    it('renders the search input', () => {
        renderWithRedux(<SearchStories />);
        expect(screen.getByPlaceholderText('Type story title...')).toBeInTheDocument();
    });

    it('displays spinner while fetching stories', async () => {
        (hackerNewsApi.searchStories as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });

        expect(await screen.findByTestId('spinner')).toBeInTheDocument();
    });

    it('displays stories after successful fetch', async () => {
        const mockStories = [
            { id: '1', title: 'React Story', url: 'https://react.com', author: 'John', points: 100, commentsNumber: 50 },
            { id: '2', title: 'Redux and React Story', url: 'https://redux.com', author: 'Jane', points: 200, commentsNumber: 75 },
        ];
        (hackerNewsApi.searchStories as jest.Mock).mockResolvedValue(mockStories);

        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });

        await waitFor(() => {
            expect(screen.getAllByTestId('highlighted-text').length).toBe(2);
            expect(screen.getByRole('link', { name: 'React Story' })).toHaveAttribute('href', 'https://react.com');
            expect(screen.getByRole('link', { name: 'Redux and React Story' })).toHaveAttribute('href', 'https://redux.com');
        });
    });

    it('displays error message on fetch failure', async () => {
        (hackerNewsApi.searchStories as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });

        expect(await screen.findByText('Failed to fetch suggestions.')).toBeInTheDocument();
    });

    it('displays message when no stories are found', async () => {
        (hackerNewsApi.searchStories as jest.Mock).mockResolvedValue([]);

        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'nonexistent' } });

        expect(await screen.findByText('No stories found.')).toBeInTheDocument();
    });

    it('updates search query on input change', () => {
        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });

        expect(input).toHaveValue('react');
    });

    it('calls searchStories with correct query on form submission', async () => {
        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(hackerNewsApi.searchStories).toHaveBeenCalledWith('react');
        });
    });

    it('clears search results when input is cleared', async () => {
        const mockStories = [
            { id: '1', title: 'React Story', url: 'https://react.com', author: 'John', points: 100, num_comments: 50 },
        ];
        (hackerNewsApi.searchStories as jest.Mock).mockResolvedValue(mockStories);

        renderWithRedux(<SearchStories />);

        const input = screen.getByPlaceholderText('Type story title...');
        fireEvent.change(input, { target: { value: 'react' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(screen.getByTestId('search-results').children.length).toBe(1);
        });

        fireEvent.change(input, { target: { value: '' } });
        fireEvent.submit(input);

        await waitFor(() => {
            expect(screen.getByTestId('search-results').children.length).toBe(0);
        });
    });
});