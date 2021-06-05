import hashlib

def login(db, email, password):
    i = {}
    query = {"email": email}
    result = db.find(query).count()
#   Se non l'email esiste
    if not result:
        return
    else:
        post = db.find(query)
        for i in post:
            pass
        if password == i['password']:
            return 1
        else:
            return 0
        pass


def checkPassowrd(p1, p2):
    if p1 == p2:
        return True
    else:
        return False


def crypt(str):
    hash_object = hashlib.sha256(str.encode())
    hex_dig = hash_object.hexdigest()
    return hex_dig
