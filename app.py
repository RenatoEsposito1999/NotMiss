from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/accedi')
def accedi():
    return render_template("accedi.html")


@app.route('/aboutus')
def about():
    return render_template("info.html")


@app.route('/contatti')
def contatti():
    return render_template("contatti.html")


@app.route('/sw.js')
def sw():
    return app.send_static_file('sw.js')