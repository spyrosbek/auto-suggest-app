import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { toggleFavorite } from '../../../store/favoriteStories.ts';
import { Story } from '../../../types/Story.ts';
import StoryListItem from '../../artefacts/story-list-item/StoryListItem.tsx';
import './favorite-stories.scss';

const FavoriteStories: React.FC = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (story: Story) => {
        dispatch(toggleFavorite(story));
    };

    return (
        <div className="favorite-stories-section">
            <div className="favorites-wrapper">
                <h2 className="header">Favorite Stories</h2>
                {favorites.length === 0 ? (
                    <p className="content">No favorite stories added yet.</p>
                ) : (
                    <ul className="content">
                        {favorites.map((story) => (
                            <StoryListItem
                                key={story.id}
                                scope="FAVORITES"
                                story={story}
                                handleClick={handleRemoveFavorite}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FavoriteStories;
