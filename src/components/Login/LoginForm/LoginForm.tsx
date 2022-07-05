import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import classes from './LoginForm.module.css'
import {useAppDispatch} from '../../../redux/hooks/hooks';
import {logIn} from '../../../redux/reducers/auth/auth-reducer';
import * as Yup from 'yup';

export type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

const SingUpSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password is too short - should be 6 chars minimum')
});

export const LoginForm = React.memo(() => {

    const dispatch = useAppDispatch();

    const initialValues: FormValuesType = {
        email: '',
        password: '',
        rememberMe: false,
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: FormValuesType, {setSubmitting}) => {
                dispatch(logIn(values));
            }}
            validationSchema={SingUpSchema}
        >
            {({errors, touched, isSubmitting}) => (
                <Form className={classes.form}>
                    <label htmlFor="email">Email</label>
                    <Field
                        id="email"
                        name="email"
                        placeholder="Your email"
                        className={`${errors.email && touched.email ? classes.errorForm : null}`}
                    />
                    <ErrorMessage name="email" component="div" className={classes.errorMessage}/>

                    <label htmlFor="password">Password</label>
                    <Field
                        id="password"
                        name="password"
                        placeholder="Your password"
                        type="password"
                        className={`${errors.password && touched.password ? classes.errorForm : null}`}
                    />
                    <ErrorMessage name="password" component="div" className={classes.errorMessage}/>

                    <label>
                        <Field type="checkbox" name="rememberMe"/>
                        Remember Me
                    </label>
                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    );
})
