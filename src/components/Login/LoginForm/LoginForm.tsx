import React from 'react';
import {Field, Form, Formik} from 'formik';
import classes from './LoginForm.module.css'
import {useAppDispatch} from '../../../redux/hooks/hooks';
import {logIn} from '../../../redux/reducers/auth/auth-reducer';


export type FormValuesType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm = React.memo(() => {

    const dispatch = useAppDispatch();

    const initialValues: FormValuesType = {
        login: '',
        password: '',
        rememberMe: false,
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values: FormValuesType) => {
                dispatch(logIn(values))
            }}
        >
            <Form className={classes.form}>
                <label htmlFor="login">Login</label>
                <Field id="login" name="login" placeholder="Your login"/>

                <label htmlFor="password">Password</label>
                <Field id="password" name="password" placeholder="Your password"/>

                <label>
                    <Field type="checkbox" name="rememberMe"/>
                    Remember Me
                </label>

                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
})
