import { Reducer } from 'redux';
import {Prediction, PredictionAction} from "./actions";

export interface PredictionState {
    prediction: Prediction[],
    strokes: number[][][],
}

export const initialState: PredictionState = {
    prediction: [],
    strokes: [],
};

export const PredictionReducer: Reducer<PredictionState, PredictionAction> = (state=initialState, action) => {
    switch (action.type) {
        case 'PREDICTION_REQUEST': {
            return { ...state, strokes: action.payload.strokes}
        }
        case 'PREDICTION_SUCCESS': {
            return { ...state, prediction: action.payload.prediction}
        }
        case 'PREDICTION_FAILURE': {
            console.error('prediction_error', action.payload.error);
            return state
        }
        case 'CLEAR_STROKES': {
            return { ...state, strokes:[], prediction: []}
        }
        default:
            return state;
    }
};
