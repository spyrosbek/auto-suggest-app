import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import hackerNewsApi from '../../../api/hackerNewsApi.ts';
import { Story } from '../../../types/Story.ts';
import { toggleFavorite } from '../../../store/favoriteStories.ts';
import Spinner from "../../molecules/spinner/Spinner.tsx";
import StoryListItem from "../../artefacts/story-list-item/StoryListItem.tsx";
import { FiX } from 'react-icons/fi';
import './search-stories.scss';

const SearchStories: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            setErrorMessage("");
            if (query.trim().length < 3) {
                setSuggestions([]);
                setErrorMessage("");
                return;
            }
            setLoading(true);
            try {
                const results = await hackerNewsApi.searchStories(query);
                setSuggestions(results);
                if (results.length === 0) {
                    setErrorMessage('No stories found.');
                }
            } catch (error) {
                setErrorMessage('Failed to fetch suggestions.');
                console.error('Failed to fetch suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const timerId = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(timerId);
    }, [query]);

    const handleToggleFavorite = (story: Story) => {
        dispatch(toggleFavorite(story));
    };

    const clearQuery = () => {
        setErrorMessage("");
        setSuggestions([]);
        setQuery('');
    };

    return (
        <div className="search-stories-section">
            <label>
                Search Hacker News
            </label>
            <input
                type="text"
                placeholder="Type story title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button className="clear-button" onClick={clearQuery} aria-label="Clear search">
                    <FiX />
                </button>
            )}
            {loading ? (
                <Spinner />
            ) : (
                <ul className="search-results" data-testid="search-results">
                    {suggestions.map((story) => (
                        <StoryListItem
                            key={story.id}
                            scope="SEARCH"
                            story={story}
                            query={query}
                            handleClick={handleToggleFavorite}
                        />
                    ))}
                </ul>
            )}
            {errorMessage.length > 0 && (
                <p className="error-message">{errorMessage}</p>
            )}
        </div>
    );
};

export default SearchStories;
