from flask import Flask, render_template, jsonify, request
from methods import DoodleClassifier
import random


classifier = DoodleClassifier()

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


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
    app.config.from_object('configurations.DevelopmentConfig')
    app.run()
