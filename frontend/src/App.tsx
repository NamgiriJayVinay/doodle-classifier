//@flow
import React, {Component} from 'react'
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import GameView from './components/GameView';
import NewRound from './components/NewRound';
import TimesUp from './components/TimesUp'
import {newGame} from "./store/layout/actions";
import {startTimer} from "./store/layout/actions";

import './style/main.css';

type PropsFromDispatch = {
    newGame: typeof newGame,
    startTimer: typeof startTimer
}

type Props = PropsFromDispatch

class App extends Component<Props> {

    constructor(props: Props){
        super(props);
        this.props.newGame(3);
    }

    render() {
        return (
            <div id="content-wrapper">
                <NewRound />
                <GameView />
                <TimesUp />
            </div>
        )}
}

const mapDispatchToProps = (dispatch: Dispatch):PropsFromDispatch => bindActionCreators({
    newGame, startTimer
}, dispatch);


export default connect(
    null,
    mapDispatchToProps,
)(App);
