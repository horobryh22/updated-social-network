import classes from './Post.module.css';
import React from 'react';

export type PostType = {
    id: number
    post: string
    likes: number
}

export const Post: React.FC<PostType> = React.memo(({post, likes}) => {
    return (
        <div className={classes.item}>
            <img src="http://archilab.online/images/1/123.jpg" alt=""/>
            {post}
            <div>
                <img src="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png" alt=""/>
                <span>{likes}</span>
            </div>
        </div>
    );
});
