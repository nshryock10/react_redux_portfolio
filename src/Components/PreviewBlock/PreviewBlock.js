import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import './PreviewBlock.css';
import { useDispatch } from 'react-redux';
import { setBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';
import { getVideoURL } from '../../utils/utils';
import { fetchUserSearch, fetchSearchResults } from '../../features/reddit/redditSlice';

export default function PreviewBlock (props) {
    const dispatch = useDispatch();
    const post = props.result.data;

    //Sets size to 'large' and translates block info to expanded component
    const handleClick = () => {
        dispatch(setSize('large'));
        dispatch(setBigBlockInfo({data: props.result.data }));        
    }

    const handleUserClick = (user) => {
        dispatch(fetchUserSearch(user));
    }

    const handleRedditClick = (subreddit) => {
        dispatch(fetchSearchResults(subreddit))
    }

    return (
        <div className="blockBox" onClick={handleClick} id={post.id}>
            {(post.thumbnail != 'http') && <h2 className='noImgTitle' >{post.title}</h2>}
            {(post.thumbnail == 'http') && <h2 className='imgTitle' >{post.title}</h2>}
            <div className='content-container'>

                {//Post thumbnail
                   post.post_hint === 'image' &&      
                   post.preview && 
                   !post.preview.reddit_video_preview &&
                    
                    <img 
                        className="img-small" 
                        src={post.url} 
                        alt=""
                    />
                }
                
                {//Post Video
                    post.is_video &&
                    post.media &&
                    (<div className="video-container">
                            <video
                                className="video"
                                src={post.media.reddit_video.fallback_url}
                                controls
                                autoPlay
                                loop
                                playsinline
                            ></video>
                    </div>)
                }

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
                            playsinline
                        ></video>
                )}

                {//Youtube video
                    post.domain.includes('yout') && 
                    (<div className="youtube-container" >
                        <iframe
                            src={getVideoURL(post.url)}
                            title="youtube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            load="lazy"
                            playsinline
                        ></iframe>
                    </div>)
                }
                </div>
            <div className="post-info">
                <h3 className='info author' onClick={() => handleUserClick(post.author)}>u/{props.result.data.author}</h3>
                <h3 className='info subreddit' onClick={()=> handleRedditClick(post.subreddit)}>r/{props.result.data.subreddit}</h3>
                <div className="vote-container" >
                   <Icon.ChevronUp className="chevron-up"/>
                    <p>{post.ups}</p>
                    <Icon.ChevronDown />
                    <p>{post.downs}</p> 
                </div>
            </div>
        </div>        
    );
}