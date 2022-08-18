import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'

export const setResults = createAsyncThunk("SET_RESULTS", (data) => {
    return data
});

const resultsReducer = createReducer({}, {
    [setResults.fulfilled]: (state, action) => action.payload,
});

export default resultsReducer;