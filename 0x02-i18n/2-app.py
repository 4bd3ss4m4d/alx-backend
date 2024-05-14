#!/usr/bin/env python3

'''
This module creates a Flask app.
'''

from flask import Flask, render_template, request
from flask_babel import Babel


class Config(object):
    '''
    Config class
    '''

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route("/")
def index():
    '''
    This function returns a string.
    '''
    return render_template("2-index.html")

@babel.localeselector
def get_locale():
    '''
    This function determines the best match with our supported languages.'''
    return request.accept_languages.best_match(app.config["LANGUAGES"])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
