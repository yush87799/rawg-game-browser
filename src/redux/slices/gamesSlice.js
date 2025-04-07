import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async ({ page = 1, pageSize = 12, searchQuery = '', filters = {} }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        key: API_KEY,
        page: page,
        page_size: pageSize,
        search: searchQuery,
      });
      
      if (filters.genres && filters.genres.length > 0) queryParams.append('genres', filters.genres);
      if (filters.tags && filters.tags.length > 0) queryParams.append('tags', filters.tags);
      if (filters.platforms && filters.platforms.length > 0) queryParams.append('platforms', filters.platforms);
      if (filters.ordering) queryParams.append('ordering', filters.ordering);
      if (filters.dates) queryParams.append('dates', filters.dates);

      
      const response = await axios.get(`${BASE_URL}/games?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGameDetails = createAsyncThunk(
  'games/fetchGameDetails',
  async (gameId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
      const screenshotsResponse = await axios.get(
        `${BASE_URL}/games/${gameId}/screenshots?key=${API_KEY}`
      );
      return {
        ...response.data,
        screenshots: screenshotsResponse.data.results
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  games: [],
  game: null,
  count: 0,
  status: 'idle', 
  error: null,
  filters: {
    genres: [],
    tags: [],
    platforms: [],
    ordering: '',
    dates: '',
  },
  searchQuery: '',
  currentPage: 1,
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; 
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; 
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearGameDetail: (state) => {
      state.game = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.games = action.payload.results;
        state.count = action.payload.count;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(fetchGameDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.game = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, setFilters, setCurrentPage, clearGameDetail } = gamesSlice.actions;
export default gamesSlice.reducer;