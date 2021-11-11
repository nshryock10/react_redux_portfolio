import React from 'react';
import './PreviewBlock.css';
import { useDispatch } from 'react-redux';
import { setBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';
import { getVideoURL } from '../../utils/utils';

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

    const post = props.result.data;
    
    return (
        <div className="blockBox" onClick={handleClick} id={post.id}>
            {(post.thumbnail != 'http') && <h2 className='noImgTitle' >{post.title}</h2>}
            {(post.thumbnail == 'http') && <h2 className='imgTitle' >{post.title}</h2>}
            <div className='content-container'>

                {//Post thumbnail
                    props.result.data.post_hint === 'image' &&      
                    props.result.data.preview && 
                    !props.result.data.preview.reddit_video_preview &&
                    
                    <img 
                        className="img-small" 
                        src={props.result.data.thumbnail} 
                        alt=""
                    />
                }
                
                {//Post Video
                    post.is_video &&
                    post.media &&
                    (
                        <div className="video-container"
                            style={{'--aspect-ratio':'3/4'}}>
                            <video
                                className="video"
                                src={post.media.reddit_video.fallback_url}
                                controls
                                autoPlay
                                loop
                            ></video>
                        </div>
                    )}

                {//Gif content
                    !post.media_embed.content &&
                    post.preview && 
                    post.preview.reddit_video_preview &&
                    post.preview.reddit_video_preview.is_gif &&
                    (
                        <video
                            className="img-small"
                            src={post.preview.reddit_video_preview.fallback_url}
                            autoPlay
                            muted
                            loop
                        ></video>
                )}

                {//Youtube video
                    <div className="youtube-container" >
                        <iframe
                            src={getVideoURL(post.url)}
                            title="youtube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            load="lazy"
                        ></iframe>
                    </div>
                }
                </div>
            <span><h3 className='author'>u/{props.result.data.author}</h3><h3 className='subreddit'>r/{props.result.data.subreddit}</h3></span>
        </div>        
    );
}