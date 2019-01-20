import {Action, Dispatch} from "redux";
import axios from 'axios';
import {PayloadAction} from "typesafe-actions/dist/types";
import {action} from "typesafe-actions";

export interface Prediction {
    id: number,
    label: string,
    probability: number
}

export type PredictionAction =
    | PayloadAction<'PREDICTION_REQUEST', {strokes: number[][][]}>
    | PayloadAction<'PREDICTION_SUCCESS', {prediction: Prediction[]}>
    | PayloadAction<'PREDICTION_FAILURE', {error: string}>
    | Action<'CLEAR_STROKES'>

// action creators

export function fetchPrediction(strokes: number[][][]) {
    return (dispatch: Dispatch<PredictionAction>) => {
        dispatch(action('PREDICTION_REQUEST', {strokes}));
        return axios.post('http://localhost:5000/api/doodle-prediction', {strokes, n:1})
            .then((res: {data: Prediction[]}) => {
                dispatch(action('PREDICTION_SUCCESS', {prediction: res.data}));
            })
            .catch((err: Error) => {
                dispatch(action('PREDICTION_FAILURE',{ error: err.message}));
            });
    };
}

export const clearStrokes = () => action('CLEAR_STROKES');