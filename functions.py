import hashlib


def check_password(p1, p2):
    if p1 == p2:
        return True
    else:
        return False


#   verifica della presenza del db dell'email e la corrispondenza con la password.
def login(db, email, password):
    i = {}
    query = {"email": email}
    result = db.find(query).count()
#   Se non l'email esiste
    if not result:
        return
    else:
#   Sono sicuro che nel db è presente una sola email corrispondente a quella data in input.
        post = db.find_one(query)
        if password == post['password']:
            return 1
        else:
            return 0
        pass




def crypt(string):
    hash_object = hashlib.sha512(string.encode())
#   trasformo la stringa in formato b e la codifico in sha512
#   ritorno la stringa codificata in hex_dif e la ritorno alla funzione chiamante.
    hex_dig = hash_object.hexdigest()
    return hex_dig
