import React from 'react';
import './ExpandedBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';

export default function ExpandedBlock(props) {
    const dispatch = useDispatch();
    const {title, thumbnail, body} = useSelector(selectBigBlockInfo);

    const handleClose = () => {
        dispatch(setSize('small'));
    }

    return (
        <div className="bigBlockContainer">
            <div className="bigBlock">
                <button onClick={handleClose}>Close</button>
                <h2>{title}</h2>
                <img className="img"src={thumbnail} alt="reddit"/>
                <p>{body}</p>
            </div>
        </div>
        
    )
}