import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../types/Story';

const FAVORITES_STORAGE_KEY = 'favoriteStories';

// Helper functions to load/update favorites from/in localStorage
const loadFavoritesFromLocalStorage = (): Story[] => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Failed to load favorites from localStorage', error);
        return [];
    }
};
const saveFavoritesToLocalStorage = (favorites: Story[]) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
    }
};

export interface FavoritesState {
    favorites: Story[];
}

const initialState: FavoritesState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const favoriteStories = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Story>) => {
            if (!state.favorites.some((story) => story.id === action.payload.id)) {
                // Add the story to favorites state
                state.favorites.push(action.payload);
                saveFavoritesToLocalStorage(state.favorites);
            } else {
                // Remove the story from favorites state
                state.favorites = state.favorites.filter((story) => story.id !== action.payload.id);
                saveFavoritesToLocalStorage(state.favorites);
            }
        },
        loadFavorites: (state) => {
            state.favorites = loadFavoritesFromLocalStorage();
        },
    },
});

export const { toggleFavorite, loadFavorites } = favoriteStories.actions;
export default favoriteStories.reducer;
