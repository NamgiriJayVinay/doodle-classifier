from os import path


here = path.abspath(path.dirname(__file__))


class BaseConfig(object):
    DEBUG = True
    TESTING = False
    #WEBPACK_MANIFEST_PATH = path.join(here, "static", "manifest.json")
    #WEBPACK_ASSETS_URL = './static'
    WEBPACK_MANIFEST_PATH = './build/manifest.json'


class ProductionConfig(BaseConfig):
    DEBUG = False


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = True
