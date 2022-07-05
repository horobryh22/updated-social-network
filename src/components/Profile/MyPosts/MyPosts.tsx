import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {useTypedSelector} from '../../../redux/hooks/hooks';
import {AddPostForm} from './AddPostForm/AddPostForm';

export const MyPosts: React.FC = React.memo(() => {

    const {posts} = useTypedSelector(state => state.profile)
    const mappedPosts = posts?.map(p => <Post key={p.id} post={p.post} likes={p.likes} id={p.id}/>);

    return (
        <div className={classes.postsBlock}>
            <h3>My post</h3>
            <AddPostForm/>
            <div className={classes.posts}>
                {mappedPosts}
            </div>
        </div>
    );
})
