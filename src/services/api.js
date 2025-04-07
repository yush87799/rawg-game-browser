import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const api = {
  getPlatforms: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/platforms?key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching platforms:', error);
      throw error;
    }
  },

  getGenres: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genres?key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  getTags: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tags?key=${API_KEY}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
};

export default api;