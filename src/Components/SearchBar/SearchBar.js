import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { fetchSearchResults, fetchRedditPosts, selectCategory } from "../../features/reddit/redditSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('general');
    const category = useSelector(selectCategory);
    
    useEffect(() => {
        dispatch(fetchRedditPosts(category))
    },[dispatch, category])
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(fetchSearchResults(searchTerm));
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