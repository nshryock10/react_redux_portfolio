import { configureStore } from "@reduxjs/toolkit";
import blocksSliceReducer from '../features/blocks/blocksSlice';
import searchBarSliceReducer from '../features/searchBar/searchBarSlice';

export default configureStore({
    reducer: {
        blocks: blocksSliceReducer,
        searchBar: searchBarSliceReducer
    }
})