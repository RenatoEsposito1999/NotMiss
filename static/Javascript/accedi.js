function removeRegistrazione() {
    let tmp = document.getElementById("registrazione"); // salvo il div
    nextToInsert = tmp;
    tmp.remove();
}


// 1 == elimino il form login per fare spazio alla registrazione
// 0 == elimino il form registrazione per fare spazio al login
function registrati(IDnascondi, flag) {

    //Cambia anche l'elemento content di meta
    let elems = document.getElementById(IDnascondi);
    let tmp, _desc;

    if (parseInt(flag, 10) === 1) {
        elems.classList.remove("fadeIn2");
        tmp = elems; //faccio questa assegnazione perché in questo modo alla  i-esima chiamata nextToInsert sarà l'elemento che è stato tolto alla i-1-esima chiamata
        elems.classList.remove("fadeInRightBig");
        elems.classList.add("fadeOutRightBig");
        _desc = "Pagina di registrazione per NotMiss";
    } else if (parseInt(flag, 10) === 0) {

        elems.classList.remove("fadeInLeftBig");
        tmp = elems; //faccio questa assegnazione perché in questo modo alla  i-esima chiamata nextToInsert sarà l'elemento che è stato tolto alla i-1-esima chiamata
        elems.classList.add("fadeOutLeftBig");
        _desc = "Pagina d'accesso per NotMiss";
    }

    document.querySelector('meta[name="description"]').setAttribute("content", _desc);

    setTimeout(function () {
        elems = document.getElementById(IDnascondi);
        elems.remove();
        elems = document.getElementById("padre_login");
        elems.appendChild(nextToInsert);
        elems = document.getElementById(nextToInsert.id);
        //parseInt(flag, 10)
        if ( parseInt(flag, 10) === 1 ) {
            elems.classList.remove("fadeOutLeftBig");
            elems.classList.add("fadeInLeftBig");
        } else if (parseInt(flag, 10) === 0) {
            elems.removeAttribute("display")
            elems.classList.add("fadeInRightBig");
        }
        nextToInsert = tmp;
    }, 500);
}


$(document).ready(function () {

    removeRegistrazione()

})


$("#_Registrazione").click(function (){
    registrati('login',1)
});

$("#_Login").click(function (){
    registrati('registrazione',0)
});


$("#_Accedi").click( function (){
    $.ajax({
            url: "http://localhost:5000/accedi.py",
            type: "POST",
            data: {
                email: $("#_email").val(),
                password: $("#_password").val()
            },
        success: function (){
            window.location.replace("/")
        },
        error: function () {
            document.write("Errore di richiesta")
        }
    });

});


$("#formReg").submit(function (e){
    e.preventDefault() //blocco il refresh sul submit del form
    if (    $('#_regPassword').val() === $('#_repassword').val()    ){
        //Vero, posso inviare dati al server
        $.ajax({
            url: "http://localhost:5000/registrazione.py",
            type: "POST",
            data: {
                nome:  $("#_nome").val(),
                cognome: $("#_cognome").val(),
                email: $("#_regEmail").val(),
                password: $("#_regPassword").val(),
                data: $("#_data").val(),
                sex: $("input:checked").val()
            },
            success: function ( result ){
                let reg = parseInt(result, 10)
                console.log(reg)
                if (reg){
                     window.location.replace("/accedi")
                }
                else{
                    $("#_Error").html('<p style="color: red; font-weight: bold">Email già esistente. Se hai gia un account effettua il <a href="/accedi" style="color: red; text-decoration: underline">Login</a>')
                }
            },
            error: function (){
                document.write("Errore di richiesta")
            }
     });
    }
    else {
        //Falso, mostro un msg di errore
        $("#_Error").html('<p style="color: red; font-weight: bold">Le password non sono uguali</p>')
    }
});



$("#formLog").submit(function (e){
    console.log("In function")
    e.preventDefault()
    $.ajax({
       url: "http://localhost:5000/accedi.py",
        type: "POST",
        data: {
           email: $("#_email").val(),
           password:  $("#_password").val()
        },
        success: function (result){
           log = parseInt(result,10)
           if (log){
               console.log("login fatto")
           }
           else {
               console.log("Login fallito")
           }
        },
        error: function (){
           document.write("Errore di richiestaaaaaaaaaaa")
        }
    });
})