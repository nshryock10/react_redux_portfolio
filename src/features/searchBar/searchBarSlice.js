import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        searchResults: [],
        searchTerm: '',
        searchType: 'general'
    },
    reducers: {
        setSearchResults: (state, action) => {
            const searchResults = action.payload;

            //clear search results on new search
            state.searchResults = [];
            
            //Map results from API
            console.log(searchResults);
            searchResults.forEach( result => state.searchResults.push(result)
            )
        },
        clearSearchResults: (state, action) => {
            state.searchBar.searchResults = [];
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        }
    }
});

//Define selectors
export const selectSearchResults = state => state.searchBar.searchResults;
export const selectSearchTerm = state => state.searchBar.searchTerm;
export const selectSearchType = state => state.searchBar.searchType;

export const { setSearchResults, setSearchTerm, setSearchType } = searchBarSlice.actions;
export default searchBarSlice.reducer;