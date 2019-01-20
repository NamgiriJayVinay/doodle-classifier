import { Reducer } from 'redux';
import { LayoutAction } from "./actions";
import Round from "../../models/Round";

export type Screens = "GameView" | "NewRound" | "TimesUp";

export interface LayoutState {
    visibleScreen: Screens,
    rounds: Round[],
    currentRound: number,
    totalRounds: number,
    timeRemainingInSeconds: number
}

export const initialState: LayoutState = {
    visibleScreen: "NewRound",
    rounds: [],
    currentRound: 0,
    totalRounds: 0,
    timeRemainingInSeconds: 0
};

export const LayoutReducer: Reducer<LayoutState, LayoutAction> = (state=initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case 'TIMER_START': {
            return {
                ...state,
                visibleScreen: "GameView",
                timeRemainingInSeconds: action.payload
            }
        }
        case 'TIMER_TICK': {
            return {
                ...state,
                timeRemainingInSeconds: state.timeRemainingInSeconds - 1
            }
        }
        case 'TIMER_STOP': {
            const gameOver = (state.currentRound === state.totalRounds);
            return {
                ...state,
                visibleScreen: (gameOver) ? "TimesUp":"NewRound",
                timeRemainingInSeconds: 0,
                currentRound: (gameOver) ? state.currentRound: state.currentRound+1
            }
        }
        case 'NEW_GAME_REQUEST': {
            return {
                ...state,
                rounds: [],
                currentRound: 0
            }
        }
        case 'NEW_GAME_SUCCESS': {
            return {
                ...state,
                rounds: action.payload.rounds,
                currentRound: 1,
                totalRounds: action.payload.rounds.length,
                visibleScreen: "NewRound"
            }
        }
        case "NEW_GAME_FAILURE": {
            console.error('WORDS_FAILURE');
            return { ...state }
        }
        default:
            return state;
    }
};
