import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { removeFavorite } from '../../../store/favoriteStories.ts';
import SavedStory from './SavedStory';
import './favorite-stories.scss';

const FavoriteStories: React.FC = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    // Handle removing a favorite story by dispatching the removeFavorite action
    const handleRemoveFavorite = (id: string) => {
        dispatch(removeFavorite(id));
    };

    return (
        <div className="favorite-stories-section">
            <h2 className="header">Favorite Stories</h2>
            {favorites.length === 0 ? (
                <p className="content">No favorite stories added yet.</p>
            ) : (
                <ul className="content">
                    {favorites.map((story) => (
                        <SavedStory
                            key={story.id}
                            story={story}
                            handleRemove={handleRemoveFavorite}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoriteStories;
