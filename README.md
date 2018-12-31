# doodle-classifier
doodle guessing app using Flask, React, and Keras

__Requirements__
- npm
- conda


__How to build Flask dev app__

There is already a bundled version of the front-end React app in `server/static/bundle.js` so to try out the app you only need to setup the server resources.

- clone repo

  `git clone http://github.com/mndrake/doodle-classifer`

- cd into server directory
  
  `cd doodle-classifer/server`
  
- build conda environment for Flask app

  `conda env create`
  
- activate conda environment

  `conda activate doodle-classifier`
  
- run Flask dev server

  `python app.py`
  
- view app at `http://localhost:5000/`

