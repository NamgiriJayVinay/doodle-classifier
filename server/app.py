import json
import random
import os
from flask import Flask, render_template, jsonify, request
from methods import DoodleClassifier


classifier = DoodleClassifier()


def create_app(settings_override=None):

    app = Flask(__name__,
                static_folder='./build/public',
                static_url_path='/public')

    params = {
        'DEBUG': True,
        'WEBPACK_MANIFEST_PATH': './build/manifest.json'
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

    app.run(use_reloader=True, use_debugger=True)
