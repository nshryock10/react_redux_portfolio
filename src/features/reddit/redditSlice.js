import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../../util/Reddit';

const initial_state = {

}

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (searchTerm) => {
        const data = Reddit.getSearchResults(searchTerm);
    }
)

const redditSlice = createSlice({
    name: 'reddit',
    initialState: initial_state,
    reducers: {

        getSearchResults: (state, action) => {

        }
    }
})