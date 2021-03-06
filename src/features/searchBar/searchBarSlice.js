import { createSlice } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        searchResults: [],
        searchTerm: '',
        searchType: 'subreddit'
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
            if (/\s/.test(action.payload)){
                state.searchTerm = action.payload.replace(/\s/g, '');
                console.log(state.searchTerm)
            }else{
                state.searchTerm = action.payload;
            }
        }
    }
});

//Define selectors
export const selectSearchResults = state => state.searchBar.searchResults;
export const selectSearchTerm = state => state.searchBar.searchTerm;

export const { setSearchResults, setSearchTerm } = searchBarSlice.actions;
export default searchBarSlice.reducer;