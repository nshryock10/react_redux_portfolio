import React from 'react';
import './PreviewBlock.css';
import { useDispatch } from 'react-redux';
import { setBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';

export default function PreviewBlock (props) {
    const dispatch = useDispatch();
    
    //Sets size to large and translates block info to expanded component
    const handleClick = () => {
        dispatch(setSize('large'));
        dispatch(setBigBlockInfo({
            //Need to rename once API is incorporated
            data: props.result.data }))
    }
    const changeMediaType = result => {
        if(result.data.media === null && (result.data.thumbnail === 'self' || result.data.thumbnail === '')) {
            return;
        }else if (result.data.thumbnail !== 'self' && result.data.thumbnail !== '') {
            return (<img src={result.data.thumbnail} alt="reddit" onError={(e) => e.target.style.display = "none"} />)
        }
        
    }
    
    return (
        <div className="blockBox" onClick={handleClick} id={props.result.data.id}>
            {(props.result.data.thumbnail != 'http') && <h2 className='noImgTitle' >{props.result.data.title}</h2>}
            {(props.result.data.thumbnail == 'http') && <h2 className='imgTitle' >{props.result.data.title}</h2>}
            <div>{changeMediaType(props.result) }</div>
            <span><h3 className='author'>{props.result.data.author}</h3><h3 className='subreddit'>{props.result.data.subreddit}</h3></span>
        </div>        
    );
}