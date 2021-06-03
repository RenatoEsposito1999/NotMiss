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
