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
            title: props.title,
            img: props.img,
            body: props.body
        }))
    }

    return (
        <div className="blockBox" onClick={handleClick}>
            <h2>{props.title}</h2>
            <p>{props.img}</p>
            <p>{props.description}</p>
        </div>        
    );
}