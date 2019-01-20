import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import {LayoutState, LayoutReducer} from "./layout/reducer";
import {PredictionState, PredictionReducer} from "./prediction/reducer";
import {layoutMiddleware} from "./layout/middleware";


export interface StoreState {
    layout: LayoutState,
    prediction: PredictionState
}

const rootReducer = combineReducers<StoreState>({
    layout: LayoutReducer,
    prediction: PredictionReducer
});

// const crossSliceReducer = (state:StoreState, action: AnyAction) => {
//     console.log(action);
//     switch (action.type) {
//         case "COVERCARD_HIDE": {
//             console.log("COVERCARD_HIDE");
//             //startTimer(20);
//             return state;
//         }
//         default:
//             return state
//     }
// };
//
// const rootReducer:Reducer<StoreState, AnyAction> = (state, action) => {
//     const intermediateState:StoreState = combinedReducer(state, action);
//     const finalState = crossSliceReducer(intermediateState, action);
//     return finalState
// };

// const logicMiddleware = createLogicMiddleware(arrLogic);


function configureStore(initialState?: StoreState) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, layoutMiddleware))
    )
}

const store = configureStore();

export default store;