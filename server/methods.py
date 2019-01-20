import numpy as np
import json
import cv2
import tensorflow as tf
from tensorflow.python.keras.applications.mobilenet_v2 import preprocess_input


class DoodleClassifier(object):

    BASE_SIZE = 256
    SIZE = 112

    def __init__(self):
        self.model = tf.contrib.saved_model.load_keras_model('data/model')
        self.model._make_predict_function()
        self.labels = json.load(open('data/labels.txt'))

    def draw_cv2(self, raw_strokes, lw=6, time_color=True):
        img = np.zeros((self.BASE_SIZE, self.BASE_SIZE), np.uint8)
        for t, stroke in enumerate(raw_strokes):
            for i in range(len(stroke[0]) - 1):
                color = 255 - min(t, 10) * 13 if time_color else 255
                _ = cv2.line(img, (stroke[0][i], stroke[1][i]),
                             (stroke[0][i + 1], stroke[1][i + 1]), color, lw)
        if self.SIZE != self.BASE_SIZE:
            return cv2.resize(img, (self.SIZE, self.SIZE))
        else:
            return img

    def get_predictions(self, raw_strokes, n):

        strokes = self.preprocess_strokes(raw_strokes)

        img = self.draw_cv2(strokes, time_color=True)

        x = np.zeros((1, self.SIZE, self.SIZE, 1))
        x[0, :, :, 0] = img
        x = preprocess_input(x).astype(np.float32)

        y_pred = self.model.predict(x)[0]
        top_n = np.argsort(-y_pred)[:n]
        return [{'id': i, 'label': self.labels[x], 'probability': float(y_pred[x])} for i, x in enumerate(top_n)]

    def preprocess_strokes(self, raw_strokes):
        x_min = min(min(x[0]) for x in raw_strokes)
        x_max = max(max(x[0]) for x in raw_strokes)
        y_min = min(min(x[1]) for x in raw_strokes)
        y_max = max(max(x[1]) for x in raw_strokes)

        scale = self.BASE_SIZE / max(x_max-x_min, y_max-y_min)
        resized_strokes = []

        for stroke in raw_strokes:
            x_resized = [round((x-x_min)*scale) for x in stroke[0]]
            y_resized = [round((y-y_min)*scale) for y in stroke[1]]
            resized_strokes.append([x_resized, y_resized])

        return resized_strokes
