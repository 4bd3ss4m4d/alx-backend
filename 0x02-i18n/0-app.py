#!/usr/bin/env python3

'''
This module creates a Flask app.
'''

from flask import render_template, Flask

app = Flask(__name__)


@app.route("/")
def index():
    '''
    This function returns a string.
    '''
    return render_template("0-index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
