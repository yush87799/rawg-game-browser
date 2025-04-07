import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedGames: [],
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    setLibrary: (state, action) => {
      state.savedGames = action.payload;
    },
    addToLibrary: (state, action) => {
      if (!state.savedGames.some(game => game.id === action.payload.id)) {
        state.savedGames.push(action.payload);
      }
    },
    removeFromLibrary: (state, action) => {
      state.savedGames = state.savedGames.filter(game => game.id !== action.payload);
    },
  },
});

export const { addToLibrary, removeFromLibrary, setLibrary } = librarySlice.actions;
export default librarySlice.reducer;
