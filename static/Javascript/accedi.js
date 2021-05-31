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

    if (parseInt(flag, 10) == 1) {
        elems.classList.remove("fadeIn2");
        tmp = elems; //faccio questa assegnazione perché in questo modo alla  i-esima chiamata nextToInsert sarà l'elemento che è stato tolto alla i-1-esima chiamata
        elems.classList.remove("fadeInRightBig");
        elems.classList.add("fadeOutRightBig");
        _desc = "Pagina di registrazione per NotMiss";
    } else if (parseInt(flag, 10) == 0) {

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
        if ( parseInt(flag, 10) == 1 ) {
            elems.classList.remove("fadeOutLeftBig");
            elems.classList.add("fadeInLeftBig");
        } else if (parseInt(flag, 10) == 0) {
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

