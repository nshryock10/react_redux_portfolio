import React from "react";
import './SearchBar.css';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { fetchSearchResults, 
        fetchRedditPosts, 
        fetchUserSearch, 
        selectCategory,
        selectSearchType,
        setSearchType } from "../../features/reddit/redditSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const category = useSelector(selectCategory);
    const searchType = useSelector(selectSearchType);
    
    useEffect(() => {
        dispatch(fetchRedditPosts(category))
    },[])
    
    const handleClick = (e) => {
        e.preventDefault();
        switch(searchType) {
            case 'subreddit':
                dispatch(fetchSearchResults(searchTerm));
                break;
            case 'user':
                dispatch(fetchUserSearch(searchTerm));
                break;
            default:
                dispatch(fetchSearchResults(searchTerm));
                break;
        }
        
    }

    const handleChange = (e) => {
        e.preventDefault();
        const searchType = e.target.value;
        console.log(searchType);
        dispatch(setSearchType(searchType));
    }

    return(
        <div>
            <form onSubmit={handleClick} > 
                <button aria-label="search">{<Icon.Search  className="search-icon"/>}</button>
                <select name="searchType" id="searchType" onChange={(e) => handleChange(e)}>
                  <option value="subreddit">r/</option>
                  <option value="user">u/</option>
                </select>
                <input placeholder="Search Reddit..." onChange={(e) => setSearchTerm(e.currentTarget.value)}></input>
                
                
            </form>
        </div>
    )
}