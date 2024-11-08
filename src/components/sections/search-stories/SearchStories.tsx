import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import hackerNewsApi from '../../../api/hackerNewsApi.ts';
import { Story } from '../../../types/Story.ts';
import { addFavorite } from '../../../store/favoriteStories.ts';

const SearchStories: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Story[]>([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim() === '') return;

            setLoading(true);
            try {
                const results = await hackerNewsApi.searchStories(query);
                setSuggestions(results);
            } catch (error) {
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

    return (
        <div className="search-stories-section">
            <input
                type="text"
                placeholder="Type to search Hacker News..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {loading && <p>Loading...</p>}
            <ul>
                {suggestions.map((story) => (
                    <li key={story.id}>
                        <a href={story.url} target="_blank" rel="noopener noreferrer">
                            {story.title}
                        </a>
                        <button onClick={() => handleAddFavorite(story)}>Add to Favorites</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchStories;
