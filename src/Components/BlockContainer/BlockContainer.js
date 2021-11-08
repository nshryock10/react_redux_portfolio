import React from 'react';
import PreviewBlock from '../PreviewBlock/PreviewBlock';
import './BlockContainer.css';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../../features/searchBar/searchBarSlice';

export default function BlockContainer (props) {
    //const results = props.results;
    const searchResults = useSelector(selectSearchResults);

    return searchResults.map( result => {
        return (
            <div >
                <PreviewBlock
                    key={result.data.id}
                    result={result} />
            </div>
        )}
    )
}