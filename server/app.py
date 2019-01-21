import json
import random
import os
from flask import Flask, render_template, jsonify, request
from methods import DoodleClassifier
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension

classifier = DoodleClassifier()


def create_app(settings_override=None):

    app = Flask(__name__,
                static_folder='./public',
                static_url_path='/public')

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    debug_toolbar = DebugToolbarExtension()

    params = {
        'DEBUG': False,
        'WEBPACK_MANIFEST_PATH': './public/manifest.json',
        'SECRET_KEY': 'NOTSOSECRET',
        'DEBUG_TB_PROFILER_ENABLED': False,
        'DEBUG_TB_TEMPLATE_EDITOR_ENABLED': False
    }

    app.config.update(params)

    if settings_override:
        app.config.update(settings_override)

    base_dir = os.path.dirname(os.path.abspath(__file__))

    with open(os.path.join(base_dir, app.config['WEBPACK_MANIFEST_PATH'])) as f:
        asset_map = json.load(f)

    @app.context_processor
    def utility_processor():
        def manifest_url_for(asset):
            return asset_map[asset]

        return dict(manifest_url_for=manifest_url_for)

    debug_toolbar.init_app(app)

    return app


app = create_app()


@app.route('/')
def index():
    return render_template('index.jinja2')


@app.route('/api/sample-words/<int:n>')
def sample_labels(n):
    sample = random.sample(classifier.labels, n)
    return jsonify(sample)


@app.route('/api/doodle-prediction', methods=['POST'])
def doodle_prediction():
    data = request.json
    strokes = data['strokes']
    n = data['n']
    predictions = classifier.get_predictions(strokes, n)
    return jsonify(predictions)


if __name__ == '__main__':

    app.run('0.0.0.0', use_reloader=True, use_debugger=True)
