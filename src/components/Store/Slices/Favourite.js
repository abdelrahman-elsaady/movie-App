import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Favourite: [],
  SeriesFavourite: []
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    AddMovie: (state, action) => {
      state.Favourite.push(action.payload);
    },
    RemoveMovie: (state, action) => {
      state.Favourite = state.Favourite.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
    AddSeries: (state, action) => {
      state.SeriesFavourite.push(action.payload);
    },
    RemoveSeries: (state, action) => {
      state.SeriesFavourite = state.SeriesFavourite.filter(
        (series) => series.id !== action.payload.id
      );
    }
  },
});

export const { AddMovie, RemoveMovie, AddSeries, RemoveSeries } = favouriteSlice.actions;
export default favouriteSlice.reducer;