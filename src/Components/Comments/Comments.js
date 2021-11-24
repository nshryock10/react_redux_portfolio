import React from 'react';
import './Comments.css';
import { decode } from '../../utils/utils';

export default function Comments ({comments}) {
    
    return comments.map( comment => {
            return (
                <div className="comments-container">
                     <div className="comment">
                        <h4 className="author-name">{comment.data.author}</h4>
                        <div className="comment-container">
                            {comment.data.body_html && <div className="comment-body" dangerouslySetInnerHTML={{__html: decode(comment.data.body_html)}}></div>}
                        </div>
                        {comment.data.replies && <Comments comments={comment.data.replies.data.children} />}
                    </div>
                </div>
                
            )
        })
}