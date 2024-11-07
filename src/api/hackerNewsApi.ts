import axios from 'axios';
import { Story, StoryData } from '../types/Story';

// Base URL for the Hacker News API
const BASE_URL = process.env.API_URL || 'https://hn.algolia.com/api/v1';

const hackerNewsApi = {
    // Search for stories based on a query
    searchStories: async (query: string) => {
        try {
            const response = await axios.get(`${BASE_URL}/search`, {
                params: {
                    query,
                },
            });
            return response.data.hits.map((storyData: StoryData) => new Story(storyData));
        } catch (error) {
            console.error('Error fetching stories:', error);
            throw error;
        }
    },
};

export default hackerNewsApi;
