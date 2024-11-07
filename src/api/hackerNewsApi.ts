import axios from 'axios';

// Base URL for the Hacker News API
const BASE_URL = process.env.API_URL || 'https://hn.algolia.com/api/v1';

export const searchStories = async (query: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                query,
            },
        });
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
    }
};
