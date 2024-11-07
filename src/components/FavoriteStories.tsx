// In src/components/FavoriteStoriesComponent.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFavorite } from '../store/favoriteStories';

const FavoriteStories: React.FC = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    // Handle removing a favorite story by dispatching the removeFavorite action
    const handleRemoveFavorite = (id: string) => {
        dispatch(removeFavorite(id));
    };

    return (
        <div>
            <h2>Favorite Stories</h2>
            {favorites.length === 0 ? (
                <p>No favorite stories added yet.</p>
            ) : (
                <ul>
                    {favorites.map((story) => (
                        <li key={story.id}>
                            <a href={story.url} target="_blank" rel="noopener noreferrer">
                                {story.title}
                            </a>
                            <button onClick={() => handleRemoveFavorite(story.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoriteStories;
