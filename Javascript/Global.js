function test(){
    console.log("Altezza: " + window.screen.height)
    console.log("Larghezza: " + window.screen.width)
}

test()

function reSizeHeader(){
    if (window.screen.width < 768) {
        console.log("Larghezza minore di 768 quindi sposto")
        let lang=document.getElementsByClassName("div_language")
        lang.style.float="left";
    }
}

reSizeHeader()