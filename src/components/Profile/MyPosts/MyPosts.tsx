import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {useTypedSelector} from '../../../redux/hooks/hooks';
import {AddTextForm} from '../../common/AddTextForm/AddTextForm';
import {addPost} from '../../../redux/reducers/profile/profile-reducer';

export const MyPosts: React.FC = React.memo(() => {

    const {posts} = useTypedSelector(state => state.profile)
    const mappedPosts = posts?.map(p => <Post key={p.id} post={p.post} likes={p.likes} id={p.id}/>);

    return (
        <div className={classes.postsBlock}>
            <h3>My post</h3>
            <AddTextForm name={'Add post'} callback={addPost}/>
            <div className={classes.posts}>
                {mappedPosts}
            </div>
        </div>
    );
})
