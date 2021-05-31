let nextToInsert// contains form element of pages accedi.html
function reSizeFooter() {
    let elems
    if (window.screen.width < 768) {
        elems = document.getElementsByClassName("_reSizeFooter");
        for (let i = 0; i < elems.length; i += 1) {
            elems[i].style.display = "none";
        }

        elems = document.getElementById("RenatoE");
        elems.innerText = "Renato E.";
        elems = document.getElementById("LucaR");
        elems.innerText = "Rubino L.";
    }
}



function reSizeLogo() {

    if (window.screen.width < 426) {
        let elems = document.getElementById("_logo");
        elems.src = "static/IMG/logo/logo128.png";
    }
}



function open(){
    $("#_sidebar").css("display", "block");
    $("#_sidebar").removeClass("slideOutLeft")
    $("#coprente").removeClass("fadeOut")
    $("#_sidebar").addClass("slideInLeft")
    $("#coprente").addClass("hide");
    $("#coprente").addClass("fadeIn");
    $(document.body).css("overflow", "hidden")
}

function slideOutLeft(){
    $("#_sidebar").removeClass("slideInLeft")
    $("#coprente").removeClass("fadeIn");
    $("#coprente").removeClass("hide");
    $("#_sidebar").css("display", "none");
    $("#_bMenu").css("display", "block");
    $(document.body).css("overflow", "initial")
}

function close(){
    setTimeout(slideOutLeft,500)
    $("#_sidebar").addClass("slideOutLeft")
    $("#coprente").addClass("fadeOut")
}


function cambiaLingua(){
    let lingua = document.getElementById("_Lingua")
    let bandiera = document.getElementById("_imgLingua")


    let bandieraENpath="IMG/Icons/bandierainglese.png"
    let indexOF = bandiera.src.indexOf("IMG");
    let substr = bandiera.src.substr(indexOF);



    if( substr == bandieraENpath){ //ENG --> ITA
        lingua.innerHTML = '<img src="../static/IMG/Icons/bandierainglese.png" alt="English Logo">English'
        bandiera.src ="../static/IMG/Icons/bandieraitalia.png"
    }
    else{
        lingua.innerHTML = '<img src="../static/IMG/Icons/bandieraitalia.png" alt="Logo Italiano">Italiano'
        bandiera.src ="../static/IMG/Icons/bandierainglese.png"
    }

}



// We have added Jquery to our project

$(document).ready(function () {

    reSizeLogo();
    reSizeFooter();

    //Open side menu
    $("#_bMenu").click(open);

//Close side menu
    $("#_closeSB").click(close);


    $("#_Lingua").click(cambiaLingua);


});
