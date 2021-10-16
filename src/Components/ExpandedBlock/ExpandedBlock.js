import React from 'react';
import './ExpandedBlock.css';

export default function ExpandedBlock(props) {
    return (
        <div className="bigBlock">
            <button onClick={props.closeBlock}>Close</button>
            <h2>EXPANDED TITLE</h2>
            <p className="img">IMAGE</p>
            <p>This is a full description of the post</p>
        </div>
    )
}