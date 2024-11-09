import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import hackerNewsApi from '../../../api/hackerNewsApi.ts';
import { Story } from '../../../types/Story.ts';
import { addFavorite } from '../../../store/favoriteStories.ts';
import './search-stories.scss';
import StoryListItem from "../../artefacts/story-list-item/StoryListItem.tsx";
import { FiX } from 'react-icons/fi';

const SearchStories: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
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

    const handleAddFavorite = (story: Story) => {
        dispatch(addFavorite(story));
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
                <div className="spinner-border text-primary text-center mt-4 mx-auto" role="status">
                    <span className="sr-only"></span>
                </div>
            ) : (
                <ul className="search-results">
                    {suggestions.map((story) => (
                        <StoryListItem
                            key={story.id}
                            scope="SEARCH"
                            story={story}
                            query={query}
                            handleClick={handleAddFavorite}
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
