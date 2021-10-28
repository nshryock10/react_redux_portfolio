import React from "react";
import { setSearchResults, setSearchType } from "../../features/searchBar/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import Reddit from '../../util/Reddit';
import { selectSearchType } from "../../features/searchBar/searchBarSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const searchType = useSelector(selectSearchType());
    
    const handleClick = (e) => {
        e.preventDefault();
        
        Reddit.getSearchResults(searchTerm, searchType).then( results => dispatch(setSearchResults(Object.values(results))));
    }
    return(
        <div>
            <h3>Search Reddit</h3>
            <form onSubmit={handleClick} > 
                <input onChange={(e) => setSearchTerm(e.currentTarget.value)}></input>
                <button >Submit</button>
                <select name="searchType" id="searchType" onChange={(e) => setSearchType(e.currentTarget.value)} >
                  <option value="general">General</option>
                  <option value="subreddit">Subreddit</option>
                  <option value="user">User</option>
                </select>
            </form>
        </div>
    )
}