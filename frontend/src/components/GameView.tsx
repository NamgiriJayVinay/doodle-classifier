import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {StoreState} from "../store";
import {clearStrokes} from "../store/prediction/actions";
import Canvas from './Canvas';
import {stopTimer} from "../store/layout/actions";
import Round from "../models/Round";
import {getCurrentRound, getPrediction} from "../selectors";

// properties passed from mapDispatchToProps
interface PropsFromDispatch {
    clearStrokes: typeof clearStrokes,
    stopTimer: typeof stopTimer
}

// properties to set from store
interface PropsFromState {
    timeRemainingInSeconds: number,
    prediction: string,
    currentRound: Round,
}

// style and any other properties
interface OtherProps {
}

type Props = PropsFromDispatch & PropsFromState & OtherProps


class GameView extends Component<Props> {

    prediction = () => {
        const guess = this.props.prediction;
        if (guess === '...') {
            return '...'
        } else if (guess === this.props.currentRound.word) {
            this.props.stopTimer();
            return "I know it's " + guess + "!"
        } else {
            return "Is it a " + guess + "?"
        }
    };

    handleSkip = () => {
        this.props.stopTimer();
    };

    render() {
        const {word} = this.props.currentRound;
        return (
            <div id="gameview">
                <div className="topbar">
                    <div id="topbar-text">Draw: {word}</div>
                    <div id="clock" className="text-blink">
                        <div id="clock-time">{'00:' + String(this.props.timeRemainingInSeconds).padStart(2, '0')}</div>
                    </div>
                    <div id="topbar-buttons">
                        <button className="button button-gray" id="button-clear" onClick={this.props.clearStrokes}>
                            <span className="icon icon-undo"/>
                        </button>
                        <button className="button button-gray" id="button-skip" onClick={this.handleSkip}>
                            <span className="icon icon-skip"/>
                        </button>
                        <button className="button button-close" onClick={this.handleSkip}>
                        </button>
                    </div>
                </div>
                <div id="speechbubble-wrapper">
                    <div id="machine-speechbubble">
                        <div id="machine-speechbubble-secondary"/>
                        <div id="machine-speechbubble-primary">{this.prediction()}</div>
                    </div>
                    <div id="machine-speechbubble-tip"/>
                </div>
                <Canvas/>}
            </div>
    )}
}


const mapStateToProps = (state: StoreState) => ({
    timeRemainingInSeconds: state.layout.timeRemainingInSeconds,
    prediction: getPrediction(state),
    currentRound: getCurrentRound(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    clearStrokes, stopTimer
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GameView);
