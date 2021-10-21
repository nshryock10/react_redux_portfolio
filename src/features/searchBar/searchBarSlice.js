import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        searchResults: [],
        searchTerm: ''
    },
    reducers: {
        setSearchResults: (state, action) => {
            const searchResults = action.payload;
            //clear search results on new search
            state.searchResults = [];
            //Map results from API
            searchResults.forEach( result => state.searchResults.push({
                    //Need to rename variables once reddit API is plugged in
                    key: result.key, 
                    title: result.title,
                    img: result.img,
                    body: result.body
                })
            )
        },
        clearSearchResults: (state, action) => {
            state.searchBar.searchResults = [];
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
            alert(state.searchTerm);
        }
    }
});

//Define selectors
export const selectSearchResults = state => state.searchBar.searchResults;
export const selectSearchTerm = state => state.searchBar.searchTerm;

export const { setSearchResults, setSearchTerm } = searchBarSlice.actions;
export default searchBarSlice.reducer;