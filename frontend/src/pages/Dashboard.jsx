import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Drawer, AppBar, Toolbar } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Typography, Divider, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';

import ProbabilityTable from '../components/ProbabilityTable.jsx';
import Canvas from '../components/canvas.jsx';
import axios from "axios/index";

import withDefaultStyle from "./style.jsx";


class Dashboard extends React.Component {
  state = {
    openDrawer: false,
    openDialog: false,
    words: [],
    predictions: [],
    strokes: []
  };

  handleAddStroke = (stroke) => {
    let data = {strokes: [...this.state.strokes, stroke], n: 4};
    axios.post('/api/doodle-prediction', data)
      .then(res => {
        this.setState({
          predictions: res.data,
          strokes: data.strokes
        })
      })
  };

  handleClearCanvas = () => {
      this.setState({predictions: [], strokes: []})
  };

  handleWordClick = () => {
    axios.get('/api/sample-words/5')
      .then(res => {
        console.log('handleWordClick');
        console.log(res);
        this.setState({
          openDialog: true,
          words: res.data});});
  };

  handleDrawerOpen = () => {
    this.setState({openDrawer: true});
  };

  handleDrawerClose = () => {
    this.setState({openDrawer: false});
  };

  handleWordDialogClose = () => {
    this.setState({openDialog: false})
  };

  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.openDrawer && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.openDrawer} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.openDrawer && classes.menuButtonHidden)}>
              <MenuIcon/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}>
              Doodle Guess
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{paper: classNames(classes.drawerPaper, !this.state.openDrawer && classes.drawerPaperClose)}}
          open={this.state.openDrawer}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>
            <ListItem
              button
              onClick={this.handleClearCanvas}>
              <ListItemIcon>
                <DeleteIcon/>
              </ListItemIcon>
              <ListItemText primary="Clear Sketchpad"/>
            </ListItem>
            <ListItem
              button
              onClick={this.handleWordClick}>
              <ListItemIcon>
                <ImageIcon/>
              </ListItemIcon>
              <ListItemText primary="Sample Words"/>
            </ListItem> </List>
        </Drawer>
        <main className={classes.content}>
          <WordDialog open={this.state.openDialog} words={this.state.words} onClose={this.handleWordDialogClose} />
          <div className={classes.appBarSpacer}/>
          <Typography variant="h4" gutterBottom component="h2">
            Sketchpad
          </Typography>
          <Typography component="div">
            <Canvas ref="canvas" onStroke={this.handleAddStroke} strokes={this.state.strokes}/>
          </Typography>
          <Typography variant="h4" gutterBottom component="h2">
            Predictions
          </Typography>
          <div className={classes.tableContainer}>
            <ProbabilityTable data={this.state.predictions}/>
          </div>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


function WordDialog({words, open, onClose}) {
  const word_list = words.map(word => (<li key={word}>{word}</li>));
  return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Try Drawing</DialogTitle>
        <DialogContent>
        <DialogContentText>
          {word_list}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default withDefaultStyle(Dashboard);
