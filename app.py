from flask import Flask, request, render_template, session, url_for, redirect
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
app.secret_key = 'notmisskey'
cors = CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/aboutus')
def about():
    return render_template("info.html")


@app.route('/contatti')
def contatti():
    return render_template("contatti.html")


@app.route('/sw.js')
def sw():
    return app.send_static_file('sw.js')


@app.route('/logout', methods=["POST", "Get"])
def logout_py():
    session.pop('_id', None)
    return redirect(url_for('index'))


@app.route('/accedi', methods=["POST", "GET"])
def accedi_py():
    if request.method == "POST":
        email = request.form["_email"]
        password = crypt(request.form["_password"])
        result = login(utenti, email, password)
        if result is not None:
            if result:
                query = utenti.find_one({"email": email})
                session["_id"] = query['_id']
                session["nome"] = query['nome']
                session["cognome"] = query['cognome']
                session["email"] = query['email']
                return redirect(url_for('index'))
            else:
                return render_template("accedi.html", result=-2)
        else:
            return render_template("accedi.html", result=-1)
        # email inesistente
    else:
        return render_template("accedi.html", result=-999)


#   return != 0 if there is an error else return 0 (return in template)
@app.route('/registrazione.py', methods=["POST"])
def registrazione_py():
    nome = request.form["_nome"]
    cognome = request.form["_cognome"]
    email = request.form["_regEmail"]
    password = crypt(request.form["_regPassword"])
    re_password = crypt(request.form["_repassword"])
    data = request.form["_data"]
    sex = request.form["sesso"]
    esito = check_password(password, re_password)
#   password non uguali
    if not esito:
        return render_template('accedi.html', result=2)
    else:
        query = {"email": email}
        result = utenti.find(query).count()
#   se è già presente l'email allora ritorno la pagina con il messaggio di errore.
        if result:
            return render_template('accedi.html', result=1)
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
            return redirect(url_for('registred'))


@app.route('/registred.py', methods=["POST", "GET"])
def registred():
    return render_template('registred.html')


@app.route('/profilo', methods=["GET", "POST"])
def profilo():
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
