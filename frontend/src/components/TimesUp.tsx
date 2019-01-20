import React, {Component} from 'react';
import classNames from "classnames";
import {bindActionCreators, Dispatch} from "redux";
import {StoreState} from "../store";
import {connect} from "react-redux";
import {newGame} from "../store/layout/actions";

// properties passed from mapDispatchToProps
interface PropsFromDispatch {
    newGame: typeof newGame
}

// properties to set from store
interface PropsFromState {
    visibleScreen: string
}

// style and any other properties
//interface IOtherProps extends WithStyles<typeof styles>{}
interface OtherProps {
}

type Props = PropsFromDispatch & PropsFromState & OtherProps


class TimesUp extends Component<Props>{
    handlePlayAgain = () => {
        this.props.newGame(3);
    };

    render() {
        const visible = (this.props.visibleScreen === "TimesUp");
        return (
            <div id="timesup-card"
                 className={classNames("covercard", {"visible": visible})}>
                <div className="card-container fill">
                    <div className="card-headline ">
                        <div id="timesup-title"/>
                    </div>
                    <div className="card-row">
                        <div className="card-text" id="timesup-subtitle">
                        Game Over
                        </div>
                    </div>
                    <div className="card-row">
                        <div id="timesup-drawings-wrapper"/>
                    </div>
                    <div className="card-row" id="portfolio">
                        <div className="card-text">
                            <button id="button-timesup-play" className="button button-large button-yellow" onClick={this.handlePlayAgain}>
                                <span className="center">Play Again</span>
                            </button>
                        </div>

                    </div>

                    <div className="card-footer" />

                </div>
                <div className="ui tr">
                    <button className="button button-close" />
                </div>
            </div>
    )}
}

const mapStateToProps = ({layout}: StoreState): PropsFromState => ({
    visibleScreen: layout.visibleScreen
});

const mapDispatchToProps = (dispatch: Dispatch): PropsFromDispatch => bindActionCreators({
    newGame
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TimesUp);