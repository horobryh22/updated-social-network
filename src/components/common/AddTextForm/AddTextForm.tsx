import React, {useState} from 'react';
import * as Yup from 'yup';
import {useAppDispatch} from '../../../redux/hooks/hooks';
import classes from './AddTextForm.module.css';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {addPost} from '../../../redux/reducers/profile/profile-reducer';
import {sendMessage} from '../../../redux/reducers/dialogs/dialogs-reducer';

type TextValuesType = {
    text: string
}

type AddTextFormPropsType = {
    name: string
    callback: typeof addPost | typeof sendMessage
}

const AddTextSchema = Yup.object().shape({
    text: Yup.string()
        .min(1, 'You can not send the empty string')
        .max(15, 'You can not enter more than 15 symbols')
});

export const AddTextForm: React.FC<AddTextFormPropsType> = React.memo(({name, callback}) => {

    const dispatch = useAppDispatch();
    const [showMode, setShowMode] = useState(true);

    const {register, handleSubmit, formState: {errors}, reset} = useForm<TextValuesType>({
        resolver: yupResolver(AddTextSchema),
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<TextValuesType> = ({text}) => {
        dispatch(callback(text));
        reset();
    }

    const onBlurHandler = () => setShowMode(false);
    const onFocusHandler = () => setShowMode(true);

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} onBlur={onBlurHandler}
              onFocus={onFocusHandler}>
            <textarea
                placeholder={'Enter your message'}
                {...register('text')}
                className={`${showMode && errors.text ? classes.errorField : null}`}
            />
            <div className={classes.errorMessage}>{showMode && errors.text?.message}</div>
            <div>
                <button>{name}</button>
            </div>
        </form>
    )
})