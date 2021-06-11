let array = [] //array contenete gli id dei documenti.
let queryResult
let sessionID
function resizeTextArea() {
    if (window.screen.width < 768 && window.screen.width > 328 ){
        $(".text-area").attr("cols", "10")
    }
    else if (window.screen.width <= 328){
        $(".text-area").attr("cols", "2")
    }
    else if (window.screen.width > 768 && window.screen.width < 1024){
        $(".text-area").attr("cols", "25")
    }
    else if (window.screen.width > 1024){
        $(".text-area").attr("cols", "40")
    }

}

//ele1 è l'elemento a cui aggiungere la classe
//ele2 è l'elemento a cui eliminare la classe.
function querySelector(ele1,ele2){
    $(ele1).addClass("_selected")
    $(ele2).removeClass("_selected")
}



$('#_priv').click(function(){
    querySelector('#_priv','#_pub')
})

$('#_pub').click(function(){
    querySelector('#_pub','#_priv')
})

$('#_loginrequired').click(function () {
    window.location.replace('/accedi')
})

function loadEventi(){
    $.ajax({
        url:'/loadEventi',
        type:'POST',
        success: function (result){
            queryResult = result
            for (let i = 0; i < result.length; i++) {
               let obj = result[i]
                let newDiv = '<!-- Inizio Post --> <div class="container mt-2 mb-5"> <div class="postContainer col-12"> <div class="row bg-dark" style="border-radius: 5px 5px 0px 0px"> <div class="col-12 text-center text-white"> <h3> <span class="nome"></span></h3> </div> </div> <div class="row text-center"> <div class="col-4"><p class=" nomeCreatore ml-2"></p></div> <div class="col-4"><p class="luogo"></p></div> <div class="col-4"><p class="tipologia"></p></div> </div> <div class="row"> <div class="col-2"> <p style="text-align: center"> <img class="_id mostraAltro" src="../static/IMG/Icons/buttonInfo256x256.png" width="32px" height="32px" alt="info" style="cursor: pointer" > </p> </div> <div class="col-8 text-center"> <p class="dataI text-center"></p> </div> <div class="col-2 " style="color: dodgerblue; font-weight: normal"> <p style="text-align: center"> <img src="../static/IMG/Icons/addButton256x256.png" alt="Partecipa" width="32px" height="32px" style="cursor: pointer"> </p> </div> </div> </div> </div> <!-- fine post -->'
                $("#contents").append(newDiv)
                $("._id").attr('class', "_"+obj['_id'])
                array.push("_" + obj['_id'])
                $(".nome").attr('class', obj['nome']).text(obj['nome'])
                $(".luogo").attr('class', obj['luogo']).text(obj['luogo'])
                $(".nomeCreatore").attr('class', obj['nomeCreatore']).text(obj['nomeCreatore'] + " " + obj['cognomeCreatore'])
                $(".tipologia").attr('class', obj['tipologia']).text("Tipologia: " + obj['tipologia'])
                $(".dataI").attr('class', obj['dataI']).text(obj['dataI'])

            }
        }
    })
}

function close2() {
    $("#_divInfo").addClass("_ds-none")
    $("#_divInfo").removeClass("d-block")
    $("#copri").removeClass("hide")
    $("#_divInfo").remove()
}

function open2() {
    $("#_divInfo").removeClass("_ds-none")
    $("#_divInfo").addClass("d-block")
    $("#copri").addClass("hide")
}

//con questa funzione vogliamo cercare le info dettagliate del post cliccato
function newDivInfo(indice) {
    //devo cercare in obj l'indice che ha come id indice (che mi passa la funzione), quando lo trovo ho trovato l'obj che contiene le info dettagliate dell'evento creato
    let obj
    for (let i = 0; i < queryResult.length; i++) {
        obj = queryResult[i]
        if (obj['_id'] == indice){
            //trovato
            let newDiv = '<!-- Inizio info post --> <div class="container _divInfo" id="_divInfo"> <div class="postContainer col-12"> <div class="row bg-dark" style="border-radius: 5px 5px 0px 0px"> <div class="col-6 offset-3 text-center text-white"> <h3 > <span class="nome"></span></h3> </div> <div class="col-2 offset-1 text-right"> <img src="../static/IMG/Icons/CloseButton128x128.png" width="24px" height="24px"  id="_close2" alt="chiudi" style="margin: 5px" /> </div> </div> <div class="row text-center"> <div class="col-6"><p class="luogo">Mappa</p></div> <div class="col-6"><p class="quantita">Max Partecipanti:</p></div> </div> <div class="row"> <div class="col-6 text-center"> <p class="text-center dataI">Inizio: 111111-11-11T11:22 </p> </div> <div class="col-6 text-center"> <p class="text-center dataF">Fine: 111111-11-11T11:22 </p> </div> </div> <div class="row text-center"> <div class="col-6"> <label for="preferenze" class="font-weight-bold">Preferenze</label> <br> <textarea class="preferenze ml-2 text-area _noresize" disabled rows="8"></textarea> </div> <div class="col-6"> <label for="descrizione2" class="font-weight-bold">Descrizione</label> <br> <textarea class="descrizione text-area ml-2 _noresize" disabled rows="8"></textarea> </div> </div> <div class="row"> <div class="col-12" style="color: dodgerblue; font-weight: normal"> <p style="text-align: right"> <img src="../static/IMG/Icons/addButton256x256.png" alt="Partecipa" width="32px" height="32px" style="margin: 5px; cursor: pointer"> </p> </div> </div> </div> </div> <!-- Fine info post --> '
            $("#infocontents").append(newDiv)
            $(".nome").attr("class", obj['nome']).text(obj['nome'])
            $(".luogo").attr('class', obj['luogo']).text(obj['luogo'])
            $(".quantita").attr('class', obj['quantita']).text("Numero partecipanti max: " + obj['quantita'])
            $(".dataI").attr('class', obj['dataI']).text(obj['dataI'])
            $(".dataF").attr('class', obj['dataF']).text(obj['dataF'])
            $(".preferenze").attr('class', obj['preferenze']).val(obj['preferenze'])
            $(".descrizione").attr('class', obj['descrizione']).val(obj['descrizione'])
        }
    }
    open2()
}

function getSession() {
    $.ajax({
        url:'/getsession',
        type:'POST',
        success:function (result){
            sessionID = result["_id"]
            if (typeof sessionID != "undefined")
                console.log("!= " + typeof sessionID)
            else
                console.log(typeof sessionID)
        }
    })

}

$(document).ready(function (){
    loadEventi();
    resizeTextArea();
    getSession();
    $('#_pub').click(function (){
        $("#contents").removeChild()
        loadEventi()
    })
    $('#_priv').click(loadEventi)

    $(".mostraAltro").click(open2)

    //cerco la classe dell'elemento cliccato nell'array che contiene tutti gli id dei post, se lo trovo allora apro il div con maggiori info, inserendo tutti i dettagli gia contenuti in obj.
    $(document).click(function (e){
        let indice
        let classList = e.target.className
        for (let i = 0; i < array.length; i++) {
            if (classList.indexOf(array[i]) != -1){
                //ho trovato l'elemento cliccato
                indice = array[i]
                //inserisco le informazioni nel div info (escludo il carattere di pos 0 che è il _)
                newDivInfo(indice.charAt(1))
            }
        }
    })




    $(document).click(function (e){
        if(e.target.id === 'copri' || e.target.id === '_close2')
            close2()
    })

})

