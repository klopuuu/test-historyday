import { PayloadAction } from "@reduxjs/toolkit";

interface IDefault {
    name: string
}

interface IAction {
    type: string
    payload: string
}


const defaultState: IDefault = {
    name: 'Science'
}

const CHANGE_HISTORY = "CHANGE_HISTORY"

export default function idReducer(state = defaultState, action: IAction): IDefault {
    switch(action.type) {
        case CHANGE_HISTORY:
            return {name: action.payload}
        default:
            return state
    }
}


export const CHANGE_HIST = (payload: string) => ({type: CHANGE_HISTORY, payload})