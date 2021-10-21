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
                    expandBlock={props.expandBlock}
                    setViewerBlock={props.setViewerBlock}
                    key={result.key}
                    title={result.title} 
                    img={result.img} 
                    description={result.description}
                    body ={result.body} />
            </div>
        )}
    )
}