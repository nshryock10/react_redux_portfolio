import React from 'react';
import PreviewBlock from '../PreviewBlock/PreviewBlock';
import './BlockContainer.css';
import { useSelector } from 'react-redux';
//import { selectSearchResults } from '../../features/searchBar/searchBarSlice';
import { selectSearchResults } from '../../features/reddit/redditSlice';

export default function BlockContainer () {
    const results = useSelector(selectSearchResults);

    return results.map( (result, index) => {
           return (
            <div className="col">
                <PreviewBlock
                    key={result.data.id}
                    result={result} />
             </div> )
        })
}