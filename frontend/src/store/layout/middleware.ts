import {Dispatch, Middleware} from "redux";
import {LayoutAction} from "./actions";
import {StoreState} from "../index";


export const layoutMiddleware: Middleware<LayoutAction, StoreState, Dispatch<LayoutAction>> = ({dispatch, getState}) => {
    let interval: number;
    return next => action => {
        if (action.type === 'TIMER_START') {
            interval = window.setInterval(() => {
                    const state = getState();
                    if (state.layout.timeRemainingInSeconds === 0) {
                        dispatch({ type: 'TIMER_STOP' });
                    } else {
                        dispatch({ type: 'TIMER_TICK' })
                    }
                },
                1000);
        } else if (action.type === 'TIMER_STOP') {
            clearInterval(interval);
        }
        next(action);
    };
};
