import React, { Component, createRef, } from 'react';
import {bindActionCreators, Dispatch} from 'redux';
import { connect } from 'react-redux';
import {fetchPrediction} from '../store/prediction/actions';
import {StoreState} from "../store";


// properties passed from mapDispatchToProps
interface PropsFromDispatch {
    fetchPrediction: typeof fetchPrediction
}

// properties to set from store
interface PropsFromState {
    strokes: Array<Array<Array<number>>>
}

// style and any other properties
interface OtherProps {
}

type Props = PropsFromDispatch & PropsFromState & OtherProps

interface Position {offsetX: number, offsetY: number}

class Canvas extends Component<Props> {

    isPainting = false;
    line:Array<{start:Position, stop:Position}> = [];
    prevPos = {offsetX: 0, offsetY: 0};

    canvas = createRef<HTMLCanvasElement>();

    handleMouseDown = (event:React.MouseEvent) => {
        const { offsetX, offsetY } = event.nativeEvent;
        this.isPainting = true;
        this.prevPos = { offsetX, offsetY };
    };

    handleMouseMove = (event:React.MouseEvent) => {
        if (this.isPainting) {
            const { offsetX, offsetY } = event.nativeEvent;
            const offSetData = { offsetX, offsetY };
            // Set the start and stop position of the paint event.
            const positionData = {
                start: { ...this.prevPos },
                stop: { ...offSetData },
            };
            // Add the position to the line array
            this.line = this.line.concat(positionData);
            this.paint(this.prevPos, offSetData);
        }
    };

    endPaintEvent = () => {
        if (this.isPainting) {
            this.isPainting = false;
            let strokeX = [];
            let strokeY = [];
            if (this.line.length > 0) {
                strokeX.push(this.line[0].start.offsetX);
                strokeY.push(this.line[0].start.offsetY);
                for (let i = 0; i < this.line.length; i++) {
                    strokeX.push(this.line[i].stop.offsetX);
                    strokeY.push(this.line[i].stop.offsetY);
                }
                this.line = [];
                this.props.fetchPrediction([...this.props.strokes, [strokeX, strokeY]]);
            }
        }
    };

    paint(prevPos: Position,
          currPos: Position) {
        const { offsetX, offsetY } = currPos;
        const { offsetX: x, offsetY: y } = prevPos;
        if (this.canvas.current !== null) {
            const ctx = this.canvas.current.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.strokeStyle = '#2c33ee';
                // Move the the prevPosition of the mouse
                ctx.moveTo(x, y);
                // Draw a line to the current position of the mouse
                ctx.lineTo(offsetX, offsetY);
                // Visualize the line using the strokeStyle
                ctx.stroke();
                this.prevPos = {offsetX, offsetY};
            }
        }
    }

    componentDidMount() {
        const container = document.getElementById('content-wrapper');
        if ((this.canvas.current !== null && container !== null)) {
            this.canvas.current.width = container.clientWidth;
            this.canvas.current.height = container.clientHeight;
            const ctx = this.canvas.current.getContext('2d');
            if (ctx) {
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.lineWidth = 5;
                this.updateCanvas();
            }
        }
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const container = document.getElementById('content-wrapper');
        if (container !== null && this.canvas.current !==null) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const ctx = this.canvas.current.getContext('2d');
            if (ctx !== null) {
                ctx.clearRect(0, 0, width, height);
                for(let i=0; i < this.props.strokes.length; i++)
                {
                    for(let j=1; j < this.props.strokes[i][0].length; j++)
                    {
                        const start = {offsetX: this.props.strokes[i][0][j-1],offsetY: this.props.strokes[i][1][j-1]};
                        const stop = {offsetX: this.props.strokes[i][0][j],offsetY: this.props.strokes[i][1][j]};
                        this.paint(start, stop)
                    }
                }
            }
        }
    }

    render() {
        return (
            <canvas
                ref={this.canvas}
        style={{ background: 'white' }}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.handleMouseMove}
        />
    );
    }

}


// connect to redux store

function mapStateToProps({prediction}: StoreState): PropsFromState {
    return {
        strokes: prediction.strokes
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    fetchPrediction
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas)
