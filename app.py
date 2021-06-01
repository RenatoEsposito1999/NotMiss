from flask import Flask, request, render_template
from flask_cors import CORS
from pymongo import MongoClient
#   Creo un instanza del client di mongodb
client = MongoClient("mongodb://localhost:27017/")
#   Creo il db / accedo al db
db = client['NotMissDB']
#   Accedo ad una collezione / creo una collezione
utenti = db['utenti']
db_id = 0
app = Flask(__name__)
cors = CORS(app)


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


@app.route('/accedi.py', methods=["POST"])
def accedi_py():
    return "Ok"


@app.route('/registrazione.py', methods=["POST"])
def registrazione_py():
    nome = request.form["nome"]
    cognome = request.form["cognome"]
    email = request.form["email"]
    password = request.form["password"]
    data = request.form["data"]
    account = {
        "nome": nome,
        "cognome": cognome,
        "email": email,
        "password": password,
        "data": data
    }
    utenti.insert_one(account)
    first_user = utenti.find()
    for item in first_user:
        print(item)
    return "ok"


@app.route('/test', methods=["POST"])
def test():
    return "Qua vanno le query per pulire eventuali test."


if __name__ == '__main__':
    app.run()
