import React, {Component} from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { Dispatch } from "redux";
import {StoreState} from '../store';
import {startTimer} from "../store/layout/actions";
import {clearStrokes} from "../store/prediction/actions";
import {getCurrentRound, getTotalRounds} from "../selectors";
import Round from "../models/Round";
import Handwritten from "./Handwritten";


// properties passed from mapDispatchToProps
interface PropsFromDispatch {
    clearStrokes: typeof clearStrokes,
    startTimer: typeof startTimer
}

// properties to set from store
interface PropsFromState {
    visibleScreen: string,
    currentRound: Round,
    totalRounds: number
}

// style and any other properties
interface OtherProps {
}

type Props = PropsFromDispatch & PropsFromState & OtherProps


class NewRound extends Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    handleNewRound = () => {
        this.props.clearStrokes();
        this.props.startTimer(20);
        //this.props.startTimer(20);
    };

    render() {
        const visible = (this.props.visibleScreen === "NewRound");
        let {word, id} = this.props.currentRound;

        return (
            <div id="newround-card"
                 className={classNames("covercard", {"visible": visible})}>
                <div className="card-container fill">
                    <div className="card-headline" id="challengetext-level">
                        {id}/{this.props.totalRounds}
                    </div>
                    <div className="card-row">
                        <div className="card-text">
                            {/*<Handwritten id={"newround-skipped"} text={"Try this one instead!"}/>*/}
                            {/*<Handwritten id={"newround-timesup"} text={"Times up, try this one instead -"}/>*/}
                            {/*<Handwritten id={"newround-completed"} text={"Great job!"}/>*/}
                            <Handwritten id={"newround-default"} text={"Draw"}/>
                            <Handwritten id={"challengetext-word"} text={word}/>
                            <Handwritten id={"time-text"} text={"in under 20 seconds"}/>

                            <button id="button-newround-play" onClick={this.handleNewRound} className="button button-large button-yellow"><span className="center">Got It!</span></button>

                        </div>
                    </div>
                    <div className="card-footer"/>
                </div>
            </div>
    )
    }
}


const mapStateToProps = (state: StoreState):PropsFromState => ({
    visibleScreen: state.layout.visibleScreen,
    currentRound: getCurrentRound(state),
    totalRounds: getTotalRounds(state),
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => bindActionCreators({
    startTimer, clearStrokes
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewRound);
