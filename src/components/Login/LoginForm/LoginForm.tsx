import React from 'react';
import classes from './LoginForm.module.css'
import {useAppDispatch, useTypedSelector} from '../../../redux/hooks/hooks';
import {SubmitHandler, useForm} from 'react-hook-form';
import {logIn} from '../../../redux/reducers/auth/auth-reducer';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignInSchema = yup.object().shape({
    email: yup.string()
        .email('Email must be a valid')
        .required('This field is required'),
    password: yup.string()
        .min(6, 'You need enter min 6 symbols')
        .required('This field is required')
})

export type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const LoginForm = React.memo(() => {

    const dispatch = useAppDispatch();

    const authError = useTypedSelector(state => state.auth.error);

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<FormValuesType>({
        resolver: yupResolver(SignInSchema),
        mode: 'onBlur'
    });

    const onSubmit: SubmitHandler<FormValuesType> = async (values) => {
        const result = await dispatch(logIn(values));
        if (!result.payload) reset();
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
                {...register('email')}
                placeholder="Your email"
                className={errors.email?.message ? classes.errorForm : ''}
            />
            <div className={classes.errorMessage}>{errors.email?.message}</div>
            <label htmlFor="password">Password</label>
            <input
                {...register('password')}
                placeholder="Your password"
                type="password"
                className={errors.password?.message ? classes.errorForm : ''}
            />
            <div className={classes.errorMessage}>{errors.password?.message}</div>
            <label>
                <input type="checkbox" {...register('rememberMe')}/>
                Remember Me
            </label>
            {authError && <div className={classes.errorMessage + ' ' + classes.errorForm} >{authError}</div>}
            <button disabled={!isValid}>Login</button>
        </form>
    );
})
