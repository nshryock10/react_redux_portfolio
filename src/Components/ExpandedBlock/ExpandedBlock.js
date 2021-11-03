import React from 'react';
import './ExpandedBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';

export default function ExpandedBlock(props) {
    const dispatch = useDispatch();
    const data = useSelector(selectBigBlockInfo);

    const handleClose = () => {
        dispatch(setSize('small'));
    }

    const changeMedia = block => {
        
        if(block.is_video){
            return <img className="img"src={block.preview.images[0].source.url} alt="reddit"/>
        } else if(block.thumbnail !== '') {
            console.log(block.thumbnail)
            return <img className="img"src={block.thumbnail} alt="reddit"/>
        }
    }

    //{changeMedia(data.data)}

    return (
        <div className="bigBlockContainer">
            <div className="bigBlock">
                <button onClick={handleClose}>Close</button>
                <h2>{data.data.title}</h2>
                <img className="img" src={data.data.url}/>
                <div src="https://www.reddit.com/r/Enhancement/comments/6yl9tt/any_way_to_get_the_direct_link_to_reddithosted/">

                </div>
                <p>{data.data.selftext}</p>
            </div>
        </div>
        
    )
}