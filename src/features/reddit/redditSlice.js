import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Reddit from '../../util/Reddit';

const initial_state = {
    searchResults: [],
    redditPosts: [],
    comments: [],
    commentsVisible: false,
    error: false,
    searchLoading: false,
    commentsLoading: false,
    selectedCategory: '/top',
    searchType: 'subreddit'
}

export const fetchSearchResults = createAsyncThunk(
    'reddit/fetchSearchResults',
    async (searchTerm) => {
        const data = Reddit.getSearchResults(searchTerm);
        return data;
    }
)

export const fetchRedditPosts = createAsyncThunk(
    'reddit/fetchRedditPosts',
    async (searchTerm) => {
        const data = Reddit.getRedditPosts(searchTerm);
        console.log(searchTerm)
        return data;
    }
)

export const fetchComments = createAsyncThunk(
    'reddit/fetchComments',
    async (args) => {
        const {subreddit, id} = args;
        const comments = Reddit.getPostComments(subreddit, id);
        return comments;
    }
)

export const fetchUserSearch = createAsyncThunk(
    'reddit/fetchUserPosts',
    async (user) => {
        const posts = Reddit.getUserSearch(user);
        return posts;
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
        },

        setCommentsVisible: (state, action) => {
            state.commentsVisible = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
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
        },
        [fetchRedditPosts.pending]: state => {
            state.searchLoading = true;
            state.error = false;
        },
        [fetchRedditPosts.fulfilled]: (state, action) => {
            state.searchLoading = false;
            state.error = false;
            state.searchResults = action.payload;
        },
        [fetchRedditPosts.rejected]: state => {
            state.searchLoading = false;
            state.error = true;
        },
        [fetchUserSearch.pending]: state => {
            state.searchLoading = true;
            state.error = false;
        },
        [fetchUserSearch.fulfilled]: (state, action) => {
            state.searchLoading = false;
            state.error = false;
            state.searchResults = action.payload;
        },
        [fetchUserSearch.rejected]: state => {
            state.searchLoading = false;
            state.error = true;
        }
    }
})

//Define actions
export const { setPosts, setComments, setCategory, setCommentsVisible, setSearchType} = redditSlice.actions;
//Define selectors
export const selectSearchResults = state => state.reddit.searchResults;
export const selectComments = state => state.reddit.comments;
export const selectCommentsVisible = state => state.reddit.commentsVisible;
export const selectError = state => state.reddit.error;
export const selectSearchLoading = state => state.reddit.searchLoading;
export const selectCommentsLoading = state => state.reddit.commentsLoading;
export const selectCategory = state => state.reddit.selectedCategory;
export const selectSearchType = state => state.reddit.searchType;
//Export reducers
export default redditSlice.reducer;