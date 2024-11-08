import React from 'react';
import { useSelector } from 'react-redux';
import { Story } from '../../../types/Story.ts';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { RootState } from "../../../store";

interface FavoriteButtonProps {
    storyId: string;
    onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ storyId, onClick }) => {
    // Check if this story is already in the favorites store
    const isFavorited = useSelector((state: RootState) =>
        state.favorites.favorites.some((favorite: Story) => favorite.id === storyId)
    );

    return (
        <a className="action-btn" onClick={onClick}>
            {isFavorited ? (
                <FaHeart />
            ) : (
                <FaRegHeart />
            )}
        </a>
    );
};

export default FavoriteButton;
