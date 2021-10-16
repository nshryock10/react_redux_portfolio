import React from 'react';
import './PreviewBlock.css';

export default function PreviewBlock (props) {
    return (
        <div>
            <div className="blockBox"
            onClick={props.expandBlock}>
                <h2>Preview Title</h2>
                <p>IMG</p>
                <p>Preview desc.</p>
            </div>
            <div className="blockBox">
                <h2>Preview Title 2</h2>
                <p>IMG</p>
                <p>Preview desc.</p>
            </div>
        </div>
        
    );
}