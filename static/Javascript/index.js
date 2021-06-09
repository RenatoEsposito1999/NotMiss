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
                let newDiv
                    $("#acaso").attr('id', obj['_id']).text(obj['nome'])
                $('#contents').append(newDiv)
            }
        }

    })
}




$(document).ready(function (){
    loadEventi();
    resizeTextArea();
    $("#mostraAltro").click(function () {
    $("#_divInfo").removeClass("_ds-none")
    $("#_divInfo").addClass("d-block")
    $("#copri").addClass("hide")
})


    $("#_close2").click(function () {
        $("#_divInfo").addClass("_ds-none")
        $("#_divInfo").removeClass("d-block")
        $("#copri").removeClass("hide")
    })


})


$('#_pub').click(function (){
    loadEventi()
})

$('#_priv').click(function (){
    loadEventi()
})

