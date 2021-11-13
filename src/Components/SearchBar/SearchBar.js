import React from "react";
import { setSearchResults } from "../../features/searchBar/searchBarSlice";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import Reddit from '../../util/Reddit';
import { fetchSearchResults, setPosts } from "../../features/reddit/redditSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('general');
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(fetchSearchResults(searchTerm));
        //Reddit.getSearchResults(searchTerm, searchType).then( results => dispatch(setSearchResults(Object.values(results))));
    }

    return(
        <div>
            <h3>Search Reddit</h3>
            <form onSubmit={handleClick} > 
                <select name="searchType" id="searchType" onChange={(e) => setSearchType(e.currentTarget.value)}>
                  <option value="subreddit">r/</option>
                  <option value="user">u/</option>
                  <option value="general">all</option>
                </select>
                <input onChange={(e) => setSearchTerm(e.currentTarget.value)}></input>
                <button >Submit</button>
                
            </form>
        </div>
    )
}