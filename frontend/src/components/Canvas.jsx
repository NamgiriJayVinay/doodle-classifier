// canvas.js

import React from 'react';
import Proptypes from 'prop-types';

class Canvas extends React.Component {

  isPainting = false;
  line = [];
  prevPos = { offsetX: 0, offsetY: 0 };

  onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    this.isPainting = true;
    this.prevPos = { offsetX, offsetY };
  };

  onMouseMove = ({ nativeEvent }) => {
    if (this.isPainting) {
      const { offsetX, offsetY } = nativeEvent;
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
        this.props.onStroke([strokeX, strokeY]);
      }
    }
  };

  paint(prevPos, currPos) {
    const { offsetX, offsetY } = currPos;
    const { offsetX: x, offsetY: y } = prevPos;

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#2c33ee';
    // Move the the prevPosition of the mouse
    this.ctx.moveTo(x, y);
    // Draw a line to the current position of the mouse
    this.ctx.lineTo(offsetX, offsetY);
    // Visualize the line using the strokeStyle
    this.ctx.stroke();
    this.prevPos = { offsetX, offsetY };
  }

  componentDidMount() {
    // Here we set up the properties of the canvas element.
    this.canvas.width = this.props.width;
    this.canvas.height = this.props.height;
    this.ctx = this.canvas.getContext('2d');
    this.ctx
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 5;
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);

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

  render() {
    return (
      <canvas
      // We use the ref attribute to get direct access to the canvas element.
        ref={(ref) => (this.canvas = ref)}
        style={{ background: 'lightgrey' }}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.endPaintEvent}
        onMouseUp={this.endPaintEvent}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}

Canvas.propTypes = {
    height: Proptypes.number,
    width: Proptypes.number,
    onStroke: Proptypes.func.isRequired,
    strokes: Proptypes.array
};

Canvas.defaultProps = {
  height: 256,
  width: 256,
  strokes: []
};

export default Canvas;
