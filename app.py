from flask import Flask, request, render_template, session, g
from flask_cors import CORS
from pymongo import MongoClient
from functions import *
#   Creo un instanza del client di mongodb
client = MongoClient("mongodb://localhost:27017/")
#   Creo il db / accedo al db
db = client['NotMissDB']
#   Accedo ad una collezione / creo una collezione
utenti = db['utenti']
db_id = 0
app = Flask(__name__)
#   app.secret_key = 'notmisskey'
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
    session.pop('user_id',None)
    email = request.form["email"]
    password = request.form["password"]
    result = login(utenti, email, password)
    if result is not None:
        if result:
            print("loggin fatto")
            query = utenti.find_one({"email": email})
            session['user_id'] = query["_id"]
        else:
            return "passwordErrata"
    else:
        return "email inesistente"
    return ""


@app.route('/registrazione.py', methods=["POST"])
def registrazione_py():
    nome = request.form["nome"]
    cognome = request.form["cognome"]
    email = request.form["email"]
    password = request.form["password"]
    data = request.form["data"]
    sex = request.form["sex"]
    query = {"email": email}
    result = utenti.find(query).count()
#   se è già presente l'email allora ritorno 0
    if result:
        return "0"
    else:
        last_id = utenti.find().count()
        account = {
            "_id": last_id+1,
            "nome": nome,
            "cognome": cognome,
            "email": email,
            "password": password,
            "data": data,
            "sex": sex
        }
        utenti.insert_one(account)
        return "1"


if __name__ == '__main__':
    app.run()


#   db.utenti.drop()
