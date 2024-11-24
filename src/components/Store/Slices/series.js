import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Instance } from "../../../services/instance";

export const seriesAction = createAsyncThunk("series/getall", 
    async ({ search, pageNumber, lang }) => {
        if (search.trim().length === 0) {
            let res = await Instance.get(`/tv/popular?&language=${lang}&page=${pageNumber}`);
            return res.data.results;
        } else {
            let res = await Instance.get(`/search/tv?&language=${lang}&query=${search}&page=${pageNumber}`);
            return res.data.results;
        }
    }
);

const seriesSlice = createSlice({
    name: "series",
    initialState: { seriesData: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder.addCase(seriesAction.fulfilled, (state, action) => {
            state.seriesData = action.payload;
            state.loading = false;
        });
        builder.addCase(seriesAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(seriesAction.rejected, (state) => {
            state.error = "Error fetching series";
        });
    },
});

export default seriesSlice.reducer; 