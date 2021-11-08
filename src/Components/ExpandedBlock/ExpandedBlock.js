import React from 'react';
import './ExpandedBlock.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectBigBlockInfo, setSize } from '../../features/blocks/blocksSlice';
import { decode } from '../../utils/utils';


export default function ExpandedBlock(props) {
    const dispatch = useDispatch();
    const data = useSelector(selectBigBlockInfo);
    const post = data.data;


    const handleClose = () => {
        dispatch(setSize('small'));
    }

    const changeMedia = block => {
        if(block.post_hint === 'image' && 
            block.preview && 
            !block.preview.reddit_video_preview){

            return <img className="img" src={block.url} alt="" />

        }else if (block.post_hint !=='link' && 
                    !block.is_self && 
                    !block.domain.includes('redd.it')){

            return <a className="content-link" href={block.url} target="_blank" >See post content</a>

        }else if(block.thumbnail !== 'self' && block.thumbnail !== '') {
             return <video className="img"
                    src={block.media.reddit_video.fallback_url} 
                    alt="reddit"
                    controls
                    autoPlay/>
        }
        else {
            return <div><p>no media</p></div>
        }
    }

    //{changeMedia(data.data)}

    return (
        <div className="bigBlockContainer">
            <div className="bigBlock">
                <button onClick={handleClose}>Close</button>
                <h2>{data.data.title}</h2>
                <div className='content-container'>

                {//Post content link
                    post.post_hint !=='link' && 
                    !post.is_self && 
                    !post.domain.includes('redd.it') &&
                   
                    <a 
                        className="content-link" 
                        href={post.url} 
                        target="_blank" 
                        rel="noreferrer" 
                    >
                        See post content
                    </a>
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
                    <a 
                        className="content-link"
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {post.url}
                    </a>
                }

                {//Post Video
                    post.is_video &&
                    post.media &&
                    (
                        <div className="video-container"
                            style={{'--aspect-ratio':'3/4'}}>
                            <video
                                className="video"
                                url={post.media.reddit_video.hls_url}
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
                        dangerouslySetInnerHTML={{__html: decode(post.selftext_html) }}
                    ></div>
                }

                </div>
                <p>{data.data.selftext}</p>
            </div>
        </div>
        
    )
}