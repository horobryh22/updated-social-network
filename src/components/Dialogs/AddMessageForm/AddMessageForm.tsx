import React from 'react';
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import classes from './AddMessageForm.module.css';
import {useAppDispatch} from '../../../redux/hooks/hooks';
import {sendMessage} from '../../../redux/reducers/dialogs/dialogs-reducer';

const SendPostSchema = Yup.object().shape({
    message: Yup.string()
        .max(15, 'You can not enter more than 15 symbols')
        .required('Enter correct value')
});

export const AddMessageForm = React.memo(() => {

    const dispatch = useAppDispatch();

    return (
        <Formik
            initialValues={{message: ''}}
            onSubmit={({message}) => {
                dispatch(sendMessage(message))
            }}
            validationSchema={SendPostSchema}
        >
            {({errors, touched}) => (
                <Form className={classes.form}>
                    <Field
                        component={'textarea'}
                        name={'message'}
                        placeholder={'Enter your message'}
                        className={`${errors.message ? classes.errorForm : null}`}
                    />
                    <ErrorMessage name="message" component="div" className={classes.errorMessage}/>
                    <div>
                        <button>Send message</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
})