import React from 'react';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {useAppDispatch} from '../../../../redux/hooks/hooks';
import {addPost} from '../../../../redux/reducers/profile/profile-reducer';
import classes from './AddPostForm.module.css';

const SendPostSchema = Yup.object().shape({
    post: Yup.string()
        .max(15, 'You can not enter more than 15 symbols')
        .required('Enter correct value')
});

export const AddPostForm = React.memo(() => {

    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={{post: ''}}
            onSubmit={({post}) => {
                dispatch(addPost(post))
            }}
            validationSchema={SendPostSchema}
        >
            {({errors, touched}) => (
                <Form className={classes.form}>
                    <Field
                        component={'textarea'}
                        name={'post'}
                        placeholder={'Enter your message'}
                        className={`${errors.post ? classes.errorField : null}`}
                    />
                    <ErrorMessage name="post" component="div" className={classes.errorMessage}/>
                    <div>
                        <button>Add Post</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
})