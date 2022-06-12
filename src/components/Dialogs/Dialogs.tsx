import React, {ChangeEvent, useCallback} from 'react';
import classes from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {changeValueTextareaMessage, sendMessage} from '../../redux/reducers/dialogs/dialogs-reducer';
import {useAppDispatch, useTypedSelector} from '../../redux/hooks/hooks';
import {Navigate} from 'react-router-dom';

export const Dialogs: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {isAuth} = useTypedSelector(state => state.auth);
    const {dialogs, messages} = useTypedSelector(state => state.dialogs);
    const textareaValue = useTypedSelector(state => state.dialogs.messageText);

    const mappedDialogs = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>);
    const mappedMessages = messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);

    const onClickButtonHandler = useCallback((): void => {
        dispatch(sendMessage());
    }, [])

    const onChangeTextareaHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
        const valueMessage = e.currentTarget.value;
        dispatch(changeValueTextareaMessage(valueMessage));
    }, [])

    return (!isAuth)
        ? <Navigate to={'/login'}/>
        :  (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                <div className={classes.dialogTitle}>Chats</div>
                {mappedDialogs}
            </div>
            <div className={classes.messages}>
                <div className={classes.messagesTitle}>Stella Johnson</div>
                <div className={classes.messagesWrapper}>
                    {mappedMessages}
                </div>
                <textarea
                    placeholder={'Enter your message'}
                    onChange={onChangeTextareaHandler}
                    value={textareaValue}
                />
                <div>
                    <button onClick={onClickButtonHandler}>Send Message</button>
                </div>
            </div>
        </div>
    )
});
