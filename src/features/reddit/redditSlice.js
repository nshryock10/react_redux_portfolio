import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../../util/Reddit';

const initial_state = {
    searchResults: [],
    comments: [],
    error: false,
    searchLoading: false,
    commentsLoading: false,
    selectedCategory: '/top'
}

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (searchTerm) => {
        console.log('searching');
        const data = Reddit.getSearchResults(searchTerm);
        return data;
    }
)

export const fetchComments = createAsyncThunk(
    'reddit/fetchComments',
    async (searchTerm, id) => {
        const comments = Reddit.getPostComments(searchTerm, id);
        return comments;
    }
)

const redditSlice = createSlice({
    name: 'reddit',
    initialState: initial_state,
    reducers: {

        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        setComments: (state, action) => {
            state.comments = action.payload;
        },

        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: {
        [fetchSearchResults.pending]: state => {
            state.searchLoading = true;
            state.error = false;
        },
        [fetchSearchResults.fulfilled]: (state, action) => {
            state.searchLoading = false;
            state.error = false;
            state.searchResults = action.payload;
        },
        [fetchSearchResults.rejected]: state => {
            state.searchLoading = false;
            state.error = true;
        },
        [fetchComments.pending]: state => {
            state.commentsLoading = true;
            state.error = false;
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.commentsLoading = false;
            state.error = false;
            state.comments = action.payload;
        },
        [fetchComments.rejected]: state => {
            state.commentsLoading = false;
            state.error = true;
        }
    }
})

//Define actions
export const { setPosts, setComments, setCategory} = redditSlice.actions;
//Define selectors
export const selectSearchResults = state => state.reddit.searchResults;
export const selectComments = state => state.reddit.comments;
export const selectError = state => state.reddit.error;
export const selectSearchLoading = state => state.reddit.searchLoading;
export const selectCommentsLoading = state => state.reddit.commentsLoading;
export const selectCategory = state => state.reddit.selectCategory;
//Export reducers
export default redditSlice.reducer;