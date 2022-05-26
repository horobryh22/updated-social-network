import classes from './Message.module.css';
import React from 'react';

export type MessageType = {
    id: number
    message: string
}

export const Message: React.FC<MessageType> = React.memo(({message, id}) => {
    return (
        <div key={id} className={classes.message}>{message}</div>
    )
});