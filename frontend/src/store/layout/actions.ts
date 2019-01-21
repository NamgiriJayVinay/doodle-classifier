import {Action, Dispatch} from "redux";
import {action} from "typesafe-actions";
import {PayloadAction} from "typesafe-actions/dist/types";
import axios from "axios";
import Round from "../../models/Round";

export type TimerAction =
    | PayloadAction<'TIMER_START', number>
    | Action<'TIMER_TICK'>
    | Action<'TIMER_STOP'>

export type NewGameAction =
    | Action<'NEW_GAME_REQUEST'>
    | PayloadAction<'NEW_GAME_SUCCESS', {rounds: Round[]}>
    | PayloadAction<'NEW_GAME_FAILURE', {error: string}>

export type LayoutAction =
    | TimerAction
    | NewGameAction

// action creators

export const startTimer = (timeInSeconds: number):TimerAction => action('TIMER_START', timeInSeconds);
export const stopTimer = ():TimerAction => action('TIMER_STOP');


// action creators

export function newGame(totalRounds: number) {
    return (dispatch: Dispatch<NewGameAction>) => {
        dispatch(action('NEW_GAME_REQUEST'));
        return axios.get('/api/sample-words/' + String(totalRounds))
            .then(res => {
                const rounds = res.data.map((word:string, i:number):Round => (
                    {id: i+1, word: word.replace(/_/g,' '), prediction: '...', strokes: []}));
                dispatch(action('NEW_GAME_SUCCESS', {rounds}));
            })
            .catch((err: Error) => {
                dispatch(action('NEW_GAME_FAILURE',{ error: err.message}));
            });
    };
}