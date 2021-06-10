let obj
let array = new Array()

function resizeTextArea() {
    if (window.screen.width < 768 && window.screen.width > 328 ){
        $(".text-area").attr("cols", "10")
    }
    else if (window.screen.width <= 328){
        $(".text-area").attr("cols", "5")
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

            for (let i = 0; i < result.length; i++) {
                obj = result[i]
                let newDiv = '<!-- Inizio Post --> <div class="container mt-2 mb-5"> <div class="postContainer"> <div class="row bg-dark" style="border-radius: 10px"> <div class="col-12 text-center text-white"> <h3> <span class="nome"></span></h3> </div> </div> <div class="row text-center"> <div class="col-4"><p class=\'nomeCreatore\' class="ml-2"></p></div> <div class="col-4"><p class="luogo"></p></div> <div class="col-4"><p class="tipologia"></p></div> </div> <div class="row"> <div class="col-2"> <p style="text-align: center"> <img class="_id mostraAltro" src="../static/IMG/Icons/buttonInfo256x256.png" width="32px" height="32px" alt="info"> </p> </div> <div class="col-8 text-center"> <p class="dataI text-center"></p> </div> <div class="col-2 " style="color: dodgerblue; font-weight: normal"> <p style="text-align: center"> <img src="../static/IMG/Icons/addButton256x256.png" alt="Partecipa" width="32px" height="32px"> </p> </div> </div> </div> </div> <!-- fine post -->'
                $("#contents").append(newDiv)
                $("._id").attr('class', "_"+obj['_id'])
                array.push("_" + obj['_id'])
                $(".nome").attr('class', obj['nome']).text(obj['nome'])
                $(".luogo").attr('class', obj['luogo']).text(obj['luogo'])
                $(".nomeCreatore").attr('class', obj['nomeCreatore']).text(obj['nomeCreatore'] + " " + obj['cognomeCreatore'])
                $(".tipologia").attr('class', obj['tipologia']).text(obj['tipologia'])
            }
        }

    })
}

function close2() {
    $("#_divInfo").addClass("_ds-none")
    $("#_divInfo").removeClass("d-block")
    $("#copri").removeClass("hide")
}

function open2() {
    $("#_divInfo").removeClass("_ds-none")
    $("#_divInfo").addClass("d-block")
    $("#copri").addClass("hide")
}

$(document).ready(function (){
    loadEventi();
    resizeTextArea();
    $("#_close2").click(close2)
    $('#_pub').click(loadEventi)
    $('#_priv').click(loadEventi)

    $(".mostraAltro").click(open2)

    //cerco la classe dell'elemento cliccato nell'array che contiene tutti gli id dei post, se lo trovo allora apro il div con maggiori info, inserendo tutti i dettagli gia contenuti in obj.
    $(document).click(function (e){
        let classList = e.target.className
        for (let i = 0; i < array.length; i++) {
            if (classList.indexOf(array[i]) != -1){
                //ho trovato l'elemento cliccato
                open2()
                //inserisco le informazioni
                newDivInfo()
            }
        }
    })

    $(document).click(function (e){
        if(e.target.id === 'copri')
            close2()
    })


})


