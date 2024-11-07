import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story } from '../types/Story';

const FAVORITES_STORAGE_KEY = 'favoriteStories';

// Helper function to load favorites from localStorage
const loadFavoritesFromLocalStorage = (): Story[] => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Failed to load favorites from localStorage', error);
        return [];
    }
};

// Helper function to save favorites to localStorage
const saveFavoritesToLocalStorage = (favorites: Story[]) => {
    try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
    }
};

interface FavoritesState {
    favorites: Story[];
}

const initialState: FavoritesState = {
    favorites: loadFavoritesFromLocalStorage(),
};

const favoriteStories = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Story>) => {
            if (!state.favorites.some((story) => story.id === action.payload.id)) {
                state.favorites.push(action.payload);
                saveFavoritesToLocalStorage(state.favorites); // Sync with localStorage
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            // Remove the favorite from state
            state.favorites = state.favorites.filter((story) => story.id !== action.payload);
            // Update localStorage after removing the favorite
            saveFavoritesToLocalStorage(state.favorites);
        },
        loadFavorites: (state) => {
            state.favorites = loadFavoritesFromLocalStorage();
        },
    },
});

export const { addFavorite, removeFavorite, loadFavorites } = favoriteStories.actions;
export default favoriteStories.reducer;
