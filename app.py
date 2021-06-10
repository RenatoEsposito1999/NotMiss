from flask import Flask, request, render_template, session, url_for, redirect, jsonify, json
from flask_cors import CORS
from pymongo import MongoClient
from functions import *

#   Creo un instanza del client di mongodb
client = MongoClient("mongodb://localhost:27017/")
#   Creo il db / accedo al db
db = client['NotMissDB']
#   Accedo ad una collezione / creo una collezione
utenti = db['utenti']
eventi = db['eventi']
contattaci = db['contattaci']
app = Flask(__name__)
app.secret_key = 'notmisskey'
cors = CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/home')
def indexhome():
    return render_template('index.html')


@app.route('/index')
def indexindex():
    return render_template('index.html')


@app.route('/aboutus')
def aboutus():
    return render_template("info.html")


@app.route('/about')
def about():
    return render_template("info.html")


@app.route('/contatti', methods=["GET", "POST"])
def contatti():
    if request.method == "GET":
        return render_template("contatti.html")
    else:
        email = request.form["_email"]
        oggetto = request.form["_oggetto"]
        corpo = request.form["_corpo"]
        #   password non uguali
        last_id = contattaci.find().count()
        messaggio = {
            "_id": last_id + 1,
            "email": email,
            "oggetto": oggetto,
            "corpo": corpo
        }
        print("Nuovo messaggio:", messaggio)
        contattaci.insert_one(messaggio)
        return redirect(url_for('index'))


@app.route('/logout', methods=["POST", "Get"])
def logout_py():
    session.pop('_id', None)
    session.pop('nome', None)
    session.pop('cognome', None)
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
                "_id": last_id + 1,
                "nome": nome,
                "cognome": cognome,
                "email": email,
                "password": password,
                "data": data,
                "sex": sex,
                "EvCreati": 0,
            }
            utenti.insert_one(account)
            return redirect(url_for('registred'),  code=307)


@app.route('/registred.py', methods=["POST", "GET"])
def registred():
    if request.method == "POST":
        return render_template('registred.html')
    else:
        return redirect(url_for('index'))


@app.route('/profilo', methods=["GET", "POST"])
def profilo():
    if request.method == "GET":
        return render_template("profilo.html")
    else:
        query = utenti.find_one({"_id": session['_id']})
        nome = query['nome']
        cognome = query['cognome']
        email = query['email']
        data = query['data']
        sex = query['sex']
        numEv = query['EvCreati']
        info = {
            "nome": nome,
            "cognome": cognome,
            "email": email,
            "data": data,
            "sex": sex,
            "EvCreati": numEv,
        }
        return jsonify(info)


@app.route('/crea-evento', methods=['GET', 'POST'])
def crea_evento():
    if request.method == 'POST':
        nome = request.form['nome']
        luogo = request.form['luogo']
        dataI = request.form['dataI']
        dataF = request.form['dataF']
        tipologia = request.form['tipologia']
        privacy = request.form['privacy']
        quantita = request.form['quantita']
        preferenze = request.form['preferenze']
        descrizione = request.form['descrizione']
        last_id = eventi.find().count()
        info = {
            '_id': last_id + 1,
            'nome': nome,
            'idCreatore': session['_id'],
            'nomeCreatore': session['nome'],
            'cognomeCreatore': session['cognome'],
            'luogo': luogo,
            'dataI': dataI,
            'dataF': dataF,
            'tipologia': tipologia,
            'privacy': privacy,
            'quantita': quantita,
            'preferenze': preferenze,
            'descrizione': descrizione
        }
        eventi.insert_one(info)
        nEvCreati = utenti.find_one({'_id': session['_id']})
        query = {"_id": session['_id']}
        values = {"$set": {'EvCreati': nEvCreati['EvCreati'] + 1}}
        utenti.update_one(query, values)
        return redirect(url_for('index'))
    else:
        return render_template('crea-evento.html')


@app.route('/loadEventi', methods=['POST'])
def loadEventi():
    if request.method == 'POST':
        cursor = eventi.find()
        list_result = list(cursor)
        return jsonify(list_result)


@app.route('/sw.js')
def serviceWorker():
    return app.send_static_file("sw.js")


# ---------------------------------------- DA QUI IN POI GESTIONE DEGLI ERRORI


@app.route('/no-script')
def noscript():
    return render_template("noscript.html")


@app.errorhandler(404)
def http404(e):
    return redirect('/')


@app.errorhandler(400)
def http400red(e):
    return redirect('/400')


@app.route('/400')
def http400():
    return render_template("400.html")


@app.errorhandler(403)
def http403red(e):
    return redirect('/403')


@app.route('/403')
def http403():
    return render_template("403.html")


@app.errorhandler(500)
def http500red(e):
    return redirect('/500')


@app.route('/500')
def http500():
    return render_template("500.html")


if __name__ == '__main__':
    app.run()
