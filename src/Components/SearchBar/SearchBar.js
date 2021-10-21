import React from "react";
import { selectSearchTerm, setSearchResults } from "../../features/searchBar/searchBarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        console.log(searchTerm);

        //Replace with API search call
        dispatch(setSearchResults([{
            key: 1,
            title: searchTerm,
            img: 'IMG 1',
            description: 'This is description 1',
            body: 'This is the body of the post 1'
          }, {
            key: 2,
            title: 'Preview 2',
            img: 'IMG 2',
            description: 'This is description 2',
            body: 'This is the body of the post 2'
          },
          {
            key: 3,
            title: 'Preview 3',
            img: 'IMG 3',
            description: 'This is description 3',
            body: 'This is the body of the post 3'
          },
          {
            key: 3,
            title: 'Preview 4',
            img: 'IMG 4',
            description: 'This is description 4',
            body: 'This is the body of the post 4'
          }  ]));
    }
    return(
        <div>
            <h3>Search Reddit</h3>
            <form onSubmit={handleClick} > 
                <input onChange={(e) => setSearchTerm(e.currentTarget.value)}></input>
                <button >Submit</button>
            </form>
        </div>
    )
}