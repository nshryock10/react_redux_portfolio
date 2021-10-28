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
            title: props.result.title,
            img: props.result.img,
            body: props.result.body
        }))
    }
    const changeMediaType = result => {
        if(result.media === null) {
            if(result.img === 'self'){
                return;
            }
        }else if (result.img !=='self') {
            return (<img src={result.img} alt="reddit" />)
        }else if (result.media.oembed) {
            console.log(result.media.oembed.html);
           const resultHTML = result.media.oembed.html;
           //console.log(resultHTML);
           return (<div dangerouslySetInnerHTML={{__html: resultHTML}}></div>);
        }
        else{
            console.log(result.media);
            return (<video src={result.media.reddit_video.hls_url} ></video>);
        }//
        
    }
    //{props.img !=='self' && <img src={props.img} alt="reddit"/>}
    
    return (
        <div className="blockBox" onClick={handleClick}>
            <h2>{props.result.title}</h2>
            <div>{changeMediaType(props.result) }</div>
            <p>{props.description}</p>
        </div>        
    );
}