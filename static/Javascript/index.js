let array = [] //array contenete gli id dei documenti.
let queryResult //
let sessionID
let lat //latitudine del luogo dell'evento
let lon //longitudine del luogo dell'evento


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

function loadEventi(privacy){
    $.ajax({
        url:'/loadEventi',
        type:'POST',
        data: {
            privacy: privacy
        },
        success: function (result){
            queryResult = result
            for (let i = result.length - 1; i >= 0 ; i--) {
               let obj = result[i]
                let newDiv = '<!-- Inizio Post --> <div class="container mt-2 mb-5"> <div class="postContainer col-12"> <div class="row bg-dark" style="border-radius: 5px 5px 0px 0px"> <div class="col-12 text-center text-white"> <h2> <span class="nome"></span></h2> </div> </div> <div class="row text-center"> <div class="col-4"><p class=" nomeCreatore ml-2"></p></div> <div class="col"></div> <div class="col"><p class="tipologia"></p></div> </div> <div class="row"></div> <div class="row"> <div class="col-2"> <p style="text-align: center"> <img class="_id mostraAltro" src="../static/IMG/Icons/buttonInfo.png" width="32px" height="32px" alt="info" style="cursor: pointer" > </p> </div> <div class="col-8 text-center"> <p class="dataI text-center"></p> </div> <div class="col-2 " style="color: dodgerblue; font-weight: normal"> <p style="text-align: center"> <img src="../static/IMG/Icons/addButton.png" alt="Partecipa" width="32px" height="32px" style="cursor: pointer" class="_id"> </p> </div> </div> </div> </div> <!-- fine post -->'
                $("#contents").append(newDiv)
                $("._id").attr('class', "_"+obj['_id'])
                array.push("_" + obj['_id'])
                $(".nome").attr('class', obj['nome']).text(obj['nome'])
                $(".luogo").attr('class', obj['luogo']).text(obj['luogo'])
                $(".nomeCreatore").attr('class', obj['nomeCreatore']).text(obj['nomeCreatore'] + " " + obj['cognomeCreatore'])
                $(".tipologia").attr('class', obj['tipologia']).text("Tipologia: " + obj['tipologia'])
                let inizioEvento = obj['dataI'].replace('T',"   ")
                $(".dataI").attr('class', obj['dataI']).text("Inizio evento: " + inizioEvento)
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
        if (obj['_id'] == indice){//trovato

    let newDiv = '<!-- Inizio info post --> <div class="container _divInfo" id="_divInfo"> <div class="postContainer col-12"> <div class="row bg-dark" style="border-radius: 5px 5px 0px 0px;"> <div class="col-6 offset-3 text-center text-white"> <h2><span class="nome" style="font-size: "></span></h2> </div> <div class="col-2 offset-1 text-right"><img src="../static/IMG/Icons/CloseButton128x128.png" width="24px" height="24px" id="_close2" alt="chiudi" style="margin: 5px;" /></div> </div> <div class="row text-center">  <div class="col-12 text-center"><p class="quantita">Max Partecipanti:</p></div> </div> <div class="row"> <div class="col-6 text-center"><p class="text-center dataI">Inizio: 111111-11-11T11:22</p></div> <div class="col-6 text-center"><p class="text-center dataF">Fine: 111111-11-11T11:22</p></div> </div> <div class="row text-center"> <div class="col"> <label for="preferenze" class="font-weight-bold">Preferenze</label> <br /> <textarea class="preferenze ml-2 text-area _noresize" disabled rows="8"></textarea> </div> <div class="col "> <label for="descrizione2" class="font-weight-bold">Descrizione</label> <br /> <textarea class="descrizione text-area ml-2 _noresize" disabled rows="8"></textarea> </div> </div> <div id="map"></div> <div class="row"> <div class="col-12"> <p style="text-align: right;"><img src="../static/IMG/Icons/addButton.png" alt="Partecipa" width="32px" height="32px" style="margin: 5px; cursor: pointer;" class="_id" /></p> </div> </div> </div> </div> <!-- Fine info post --> '
            $("#infocontents").append(newDiv)
            $("._id").attr('class', "_"+obj['_id'])
            $(".nome").attr("class", obj['nome']).text(obj['nome'])
            $(".luogo").attr('class', obj['luogo']).text(obj['luogo'])
            $(".quantita").attr('class', obj['quantita']).text("Numero partecipanti max: " + obj['quantita'])
            let inizioEvento = obj['dataI'].replace('T',"   ")
            $(".dataI").attr('class', obj['dataI']).text("Inizio: " + inizioEvento)
            let fineEvento = obj['dataF'].replace('T',"   ")
            $(".dataF").attr('class', obj['dataF']).text("Fine: " + fineEvento)
            $(".preferenze").attr('class', obj['preferenze']).val(obj['preferenze'])
            $(".descrizione").attr('class', obj['descrizione']).val(obj['descrizione'])
            openMap(obj['lat'],obj['lon'])
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
        }
    })

}

function openMap(lat,lon){
    if (lat === '0' && lon === '0'){
    $("#map").addClass('_ds-none')
    }
 let mymap = L.map('map').setView([lat,lon],16)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
 }).addTo(mymap);
 L.marker([lat, lon], {draggable:false}).addTo(mymap)
}


function addParticipant(indice) {
    if (typeof sessionID == 'undefined') {
        window.location.replace('/accedi')
    } else {
        $.ajax({
            url: '/partecipa',
            method: 'POST',
            data: {
                idEvento: indice,
                idUtente: sessionID
            },
            success: function (result){
               if (result ==='1'){
                    window.location.replace('/added')
               }
               else if(result === '0'){
                   alert("Sei già stato inserito in questo evento")
               }
               else{
                   alert("È stato raggiunto il massimo numero di partecipanti.")
               }
            }

        })
    }
}


$(document).ready(function (){
    loadEventi('Pubblico');
    resizeTextArea();
    getSession();
    $('#_pub').click(function (){
        $("#contents").empty()
        loadEventi('Pubblico')
    })
    $('#_priv').click(function (){
       $("#contents").empty()
        loadEventi('Privato')
    })

    $(".mostraAltro").click(open2)

    //cerco la classe dell'elemento cliccato nell'array che contiene tutti gli id dei post, se lo trovo allora apro il div con maggiori info, inserendo tutti i dettagli gia contenuti in obj.
    $(document).click(function (e){

        let indice
        let classList = e.target.className
        for (let i = array.length - 1; i >= 0 ; i--) {
            if (classList.indexOf(array[i]) != -1){
                //ho trovato l'elemento cliccato
                indice = array[i]
                //inserisco le informazioni nel div info (escludo il carattere di pos 0 che è il _)
                if ($(e.target).attr('src') === '../static/IMG/Icons/addButton.png'){
                addParticipant(indice.charAt(1))
                }
                else {
                newDivInfo(indice.charAt(1))
                }

            }
        }
    })


    $(document).click(function (e){
        if(e.target.id === 'copri' || e.target.id === '_close2')
            close2()


    })



})


