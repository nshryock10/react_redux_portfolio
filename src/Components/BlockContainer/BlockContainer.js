import React from 'react';
import PreviewBlock from '../PreviewBlock/PreviewBlock';
import './BlockContainer.css';
import { useSelector } from 'react-redux';
//import { selectSearchResults } from '../../features/searchBar/searchBarSlice';
import { selectSearchLoading, selectSearchResults } from '../../features/reddit/redditSlice';

export default function BlockContainer (props) {
    //const results = props.results;
    //const searchResults = useSelector(selectSearchResults);
    const results = useSelector(selectSearchResults);

    return results.map( result => {
        return (
            <div >
                
                <PreviewBlock
                    key={result.data.id}
                    result={result} />
             </div> 
            
        )}
    )
}