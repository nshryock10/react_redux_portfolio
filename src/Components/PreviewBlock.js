import React from 'react';
import './PreviewBlock.css';

export default function PreviewBlock () {
    return (
        <div className="blockContainer">
            <div className="blockBox">
                <h2>Preview Title</h2>
                <p>IMG</p>
                <p>Preview desc.</p>
            </div>
            <div className="blockBox">
                <h2>Preview Title</h2>
                <p>IMG</p>
                <p>Preview desc.</p>
            </div>
        </div>
        
    );
}