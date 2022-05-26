import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import {Post, PostType} from './Post/Post';
import {MapDispatchPropsType, MapStatePropsType} from './MyPostsContainer';

type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;

export const MyPosts: React.FC<MyPostsPropsType> = ({profilePage, addPost, changeValuePost}) => {

    const posts = profilePage.posts?.map(p => <Post key={p.id} post={p.post} likes={p.likes} id={p.id}/>);

    const onClickButtonHandler = (): void => {
        addPost();
    }

    const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const valuePost = e.currentTarget.value;
        changeValuePost(valuePost);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My post</h3>
            <div>
                <textarea onChange={onChangeTextareaHandler} value={profilePage.postText ? profilePage.postText : ''}/>
                <div>
                    <button onClick={onClickButtonHandler}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {posts}
            </div>
        </div>
    );
}
