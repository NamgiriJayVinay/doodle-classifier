import { createSelector } from 'reselect'
import {StoreState} from "../store";

export const getLayoutState = (state: StoreState) => state.layout;

export const getPredictionState = (state: StoreState) => state.prediction;

export const getCurrentRound = createSelector(getLayoutState, (layout) => {
    const round = layout.rounds.find(r => r.id == layout.currentRound);
    if (round === undefined) {
        return {id: 0, strokes: [], prediction: '', word: ''}
    } else {
        return round
    }
});

export const getTotalRounds = createSelector(getLayoutState, (layout) => {
    return layout.rounds.length
});

export const getPrediction = createSelector(getPredictionState, (prediction) => {
    const p = prediction.prediction;
    if (p.length > 0) {
        return p[0].label.replace('_', ' ');
    } else {
        return '...';
    }
});
