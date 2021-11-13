import { configureStore } from "@reduxjs/toolkit";
import blocksSliceReducer from '../features/blocks/blocksSlice';
import searchBarSliceReducer from '../features/searchBar/searchBarSlice';
import commentsSliceReducer from '../features/comments/commentsSlice';
import redditSliceReducer from '../features/reddit/redditSlice';

export default configureStore({
    reducer: {
        blocks: blocksSliceReducer,
        searchBar: searchBarSliceReducer,
        comments: commentsSliceReducer,
        reddit: redditSliceReducer
    }
})