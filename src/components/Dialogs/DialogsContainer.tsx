import React from 'react';
import {
    changeValueMessageActionCreator,
    DialogsActionsType, DialogsPageType,
    sendMessageActionCreator
} from '../../redux/reducers/dialogs/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';


export type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

export type MapDispatchPropsType = {
    sendMessage: () => void
    changeValueMessage: (valueMessage: string) => void
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

const mapStateToDispatch = (dispatch: (action: DialogsActionsType) => void): MapDispatchPropsType => {
    return {
        sendMessage: () => dispatch(sendMessageActionCreator()),
        changeValueMessage: (valueMessage: string) => dispatch(changeValueMessageActionCreator(valueMessage))
    }
}

export const DialogsContainer = connect(mapStateToProps, mapStateToDispatch)(Dialogs);
