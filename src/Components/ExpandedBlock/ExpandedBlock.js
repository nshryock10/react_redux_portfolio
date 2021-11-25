import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import './ExpandedBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';
import { decode, getVideoURL } from '../../utils/utils';
import Comments from '../Comments/Comments';
import {selectCommentsLoading, 
        selectComments, 
        fetchComments, 
        selectCommentsVisible, 
        setCommentsVisible,
        fetchUserSearch, 
        fetchSearchResults} from '../../features/reddit/redditSlice';


export default function ExpandedBlock(props) {
    const dispatch = useDispatch();
    const data = useSelector(selectBigBlockInfo);
    const comments = useSelector(selectComments);
    const commentsLoading = useSelector(selectCommentsLoading);
    const commentsVisible = useSelector(selectCommentsVisible);
    const post = data.data;


    const handleClose = () => {
        dispatch(setSize('small'));
        dispatch(setCommentsVisible(false));
    }

    const handleCommentCick = () => {
        const subreddit = post.subreddit;
        const id = post.id;
        dispatch(setCommentsVisible(true));
        dispatch(fetchComments({subreddit, id}));
    }

    const handleRedditClick = (subreddit) => {
        dispatch(fetchSearchResults(subreddit))
    }

    const handleUserClick = (user) => {
        dispatch(fetchUserSearch(user));
    }

    return (
        <div className="bigBlockContainer">
            <div className="big-block-content">           
                <div className="bigBlock">
                    <div className="block-close">
                        <button onClick={handleClose}>Close {<Icon.XLg className="x-lg"/>}</button>
                    </div>
                    <div className="post-info-container">
                        <h3 className="post-info reddit" onClick={() => handleRedditClick(post.subreddit)}>r/{post.subreddit}</h3>
                        <h3 className="post-info user" onClick={() => handleUserClick(post.author)}>u/{post.author}</h3>
                    </div>
                    <h2>{data.data.title}</h2>
                    
                    <div className='big-content-container'>

                        {//Post content link
                            post.post_hint !=='link' && 
                            !post.is_self && 
                            !post.domain.includes('redd.it') &&
                        <div>
                                <a 
                                    className="content-link" 
                                    href={post.url} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                >
                                    See post content
                                </a>
                                <br></br>
                            </div>
                        }

                        {//Post Image
                            post.post_hint === 'image' &&      
                            post.preview && 
                            !post.preview.reddit_video_preview &&
                            
                            <img 
                                className="img" 
                                src={post.url} 
                                alt=""
                            />
                        }

                        {//Post Text
                            post.selftext.length > 0 && 
                        
                            <div 
                                className='selfText'
                                dangerouslySetInnerHTML={{__html: decode(post.selftext_html) }}
                            >
                            </div>
                        }

                        {//Post link
                            post.post_hint === 'link' &&
                            <div>
                                <a 
                                    className="content-link"
                                    href={post.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {post.url}
                                </a>
                            </div>
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
                                    ></video><br/>
                                    <a href={post.url}>See Video</a>
                                </div>
                            )}
                        
                        {//Gif content
                            !post.media_embed.content &&
                            post.preview && 
                            post.preview.reddit_video_preview &&
                            post.preview.reddit_video_preview.is_gif &&
                            (
                                <video
                                    className="img"
                                    src={post.preview.reddit_video_preview.fallback_url}
                                    autoPlay
                                    muted
                                    loop
                                ></video>
                        )}

                        {//Embedded media
                            !post.domain.includes('yout') &&
                            post.media_embed &&
                            post.media_embed.content &&
                            <div
                                className="img"
                                dangerouslySetInnerHTML={{__html: decode(post.media_embed.content) }}
                            ></div>
                        }

                        {//Youtube video
                            post.domain.includes('yout') && 
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
                    <div className="content-footer">
                        <div className="big-vote-container" >
                                <Icon.ChevronUp className="chevron" />
                                <p>{post.ups}</p>
                                <Icon.ChevronDown className="chevron" />
                                <p>{post.downs}</p> 
                        </div>
                        <h3 onClick={handleCommentCick} >{<Icon.Chat className="comment-icon"/>} {}</h3>
                    </div>
                </div>
                <div className="comment-block">  
                        {commentsLoading && <h4>{<Icon.Reddit className="reddit-logo App-logo"/>}</h4>}
                        {commentsVisible && <Comments comments={comments}/>}
                </div>
            </div>
            
        </div>
        
    )
}