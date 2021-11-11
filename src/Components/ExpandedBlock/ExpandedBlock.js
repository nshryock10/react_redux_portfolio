import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import './ExpandedBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';
import { decode, getVideoURL } from '../../utils/utils';
import Reddit from '../../util/Reddit';
import { setComments, setCommentVisible, selectComments, selectSeeComments } from '../../features/comments/commentsSlice';
import Comments from '../Comments/Comments';


export default function ExpandedBlock(props) {
    const dispatch = useDispatch();
    const data = useSelector(selectBigBlockInfo);
    const comments = useSelector(selectComments);
    const commentVisible = useSelector(selectSeeComments)
    const post = data.data;


    const handleClose = () => {
        dispatch(setSize('small'));
        dispatch(setCommentVisible(true));
    }

    const handleCommentCick = async() => {
        dispatch(setCommentVisible(!commentVisible))
        await Reddit.getPostComments(post.subreddit, post.id).then(comments => dispatch(setComments(Object.values(comments))))
    }

    return (
        <div className="bigBlockContainer">
            <div className="bigBlock">
                <button onClick={handleClose}>Close</button>
                <h2>{data.data.title}</h2>
                <span>
                    <h3 className="post-info user">u/{post.author}</h3>
                    <h3 className="post-info reddit">r/{post.subreddit}</h3>
                </span>
                <div className="vote-container" >
                   <Icon.ChevronUp />
                    <p>{post.ups}</p>
                    <Icon.ChevronDown />
                    <p>{post.downs}</p> 
                </div>
                
                <i className="bi bi-chevron-down icon vote-down"></i>
                <div className='content-container'>

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
                                <a href={post.url}>{post.url}</a>
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
                <div className="comment-block">
                   <h3 onClick={handleCommentCick} >See Comments</h3> 
                   {commentVisible && <Comments comments={comments} />}
                </div>
                
            </div>
            
        </div>
        
    )
}