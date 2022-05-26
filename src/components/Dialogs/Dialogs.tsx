import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {useAppDispatch, useTypedSelector} from '../../redux/store';
import {changeValueTextareaMessage, sendMessage} from '../../redux/reducers/dialogs/dialogs-reducer';

export const Dialogs: React.FC = React.memo(() => {

    const dispatch = useAppDispatch();
    const {dialogs, messages} = useTypedSelector(state => state.dialogsPage);
    const textareaValue = useTypedSelector(state => state.dialogsPage.messageText);

    const mappedDialogs = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>);
    const mappedMessages = messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);

    const onClickButtonHandler = (): void => {
        dispatch(sendMessage());
    }

    const onChangeTextareaHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const valueMessage = e.currentTarget.value;
        dispatch(changeValueTextareaMessage(valueMessage));
    }

    return (
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
