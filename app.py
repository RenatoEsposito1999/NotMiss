from flask import Flask, request, render_template, session, url_for, redirect, jsonify
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


#db.utenti.drop()
#db.eventi.drop()






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
        num = 0
        EV = {}
        cursor = eventi.find()
        for item in cursor:
            if session['_id'] in item['partecipanti']:
                EV[num] = item
                num = num + 1

        info = {
            "nome": nome,
            "cognome": cognome,
            "email": email,
            "data": data,
            "sex": sex,
            "EvCreati": numEv,
            'numEV': num,
            'EV': EV,
        }
        return jsonify(info)


@app.route('/crea-evento', methods=['GET', 'POST'])
def crea_evento():
    if request.method == 'POST':
        nome = request.form['nome']
        dataI = request.form['dataI']
        dataF = request.form['dataF']
        tipologia = request.form['tipologia']
        privacy = request.form['privacy']
        lat = request.form['lat']
        lon = request.form['lon']
        quantita = request.form['quantita']
        preferenze = request.form['preferenze']
        descrizione = request.form['descrizione']
        last_id = eventi.find().count()
        partecipanti = [session['_id']]
        quantita = int(quantita) + 1
        info = {
            '_id': last_id + 1,
            'nome': nome,
            'idCreatore': session['_id'],
            'nomeCreatore': session['nome'],
            'cognomeCreatore': session['cognome'],
            'dataI': dataI,
            'dataF': dataF,
            'lat': lat,
            'lon': lon,
            'tipologia': tipologia,
            'privacy': privacy,
            'quantita': quantita + 1,
            'preferenze': preferenze,
            'descrizione': descrizione,
            'partecipanti': partecipanti
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
    privacy = request.form.get('privacy')
    if request.method == 'POST':
        if privacy == 'Pubblico':
            query = {"privacy": "Pubblico"}
        else:
            query = {"privacy": "Privato"}
    cursor = eventi.find(query)
    list_result = list(cursor)
    return jsonify(list_result)


@app.route('/partecipa', methods=['POST'])
def partecipa():
    if request.method == 'POST':
        id_ev = int(request.form.get("idEvento"))
        id_ut = int(request.form.get("idUtente"))
        query = {"_id": id_ev}
        EV = eventi.find_one(query)
        newList = EV['partecipanti'].copy()
        if id_ut in newList:
            return '0'
        elif len(newList) >= int(EV['quantita']):
            return '-1'
        else:
            newList.insert(0, id_ut)
            newvalues = {"$set": {"partecipanti": newList}}
            eventi.update_one(query, newvalues)
            return '1'

@app.route('/getsession', methods=["POST"])
def getsession():
    result = {"_id": session["_id"]}
    return jsonify(result)


@app.route('/added')
def added():
    return render_template('added.html')


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

