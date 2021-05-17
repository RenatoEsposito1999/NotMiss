function reSizeFooter(){
    if (window.screen.width < 768) {

        let elems = document.getElementsByClassName('_reSizeFooter')
        for (let i=0;i<elems.length;i+=1){
            elems[i].style.display = 'none'
        }


        elems = document.getElementById("RenatoE")
        elems.innerText="Renato E."
        elems = document.getElementById("LucaR")
        elems.innerText="Rubino L."
    }
}

reSizeFooter()


function reSizeLogo(){
    if(window.screen.width<426){
        console.log("TEST")
        let elems = document.getElementById("_logo")
        elems.src="../IMG/logo2.png"
    }
}

reSizeLogo()


function registrati(){
    //Cambia anche l'elemento content di meta
    let elems = document.getElementById("nascondi")
        elems.classList.remove("fadeIn2")
        elems.classList.add("fadeOutRightBig")

    setTimeout(function(){
        elems.parentNode.removeChild(elems)

        elems = document.getElementById("registrazione")
        elems.classList.remove("_ds-none")
        elems.classList.add("fadeInLeftBig")
    }, 300);

    let _desc="Pagina di registrazione per NotMiss"
    document.querySelector('meta[name="description"]').setAttribute("content", _desc);
}


