import React, {ChangeEvent} from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {useAppDispatch, useTypedSelector} from '../../../redux/store';
import {addPost, changeValueTextareaPost} from '../../../redux/reducers/profile/profile-reducer';

export const MyPosts: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {posts, postText} = useTypedSelector(state => state.profilePage)

    const mappedPosts = posts?.map(p => <Post key={p.id} post={p.post} likes={p.likes} id={p.id}/>);

    const onClickButtonHandler = (): void => {
        dispatch(addPost())
    }

    const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const valuePost = e.currentTarget.value;
        dispatch(changeValueTextareaPost(valuePost))
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My post</h3>
            <div>
                <textarea onChange={onChangeTextareaHandler} value={postText ? postText : ''}/>
                <div>
                    <button onClick={onClickButtonHandler}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {mappedPosts}
            </div>
        </div>
    );
})
