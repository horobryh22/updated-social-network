import React from 'react';
import classes from './Dialogs.module.css';
import {DialogItem} from './DialogItem/DialogItem';
import {Message} from './Message/Message';
import {useTypedSelector} from '../../redux/hooks/hooks';
import {compose} from '@reduxjs/toolkit';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {AddMessageForm} from './AddMessageForm/AddMessageForm';

const Dialogs: React.FC = React.memo(() => {

    const {dialogs, messages} = useTypedSelector(state => state.dialogs);

    const mappedDialogs = dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id} avatar={d.avatar}/>);
    const mappedMessages = messages.map(m => <Message key={m.id} message={m.message} id={m.id}/>);

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
                <AddMessageForm/>
            </div>
        </div>
    )
});

export default React.memo(compose<React.ComponentType>(withAuthRedirect)(Dialogs));
