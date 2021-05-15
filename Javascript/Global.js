function reSizeFooter(){
    if (window.screen.width < 768) {

        let elems = document.getElementsByClassName('_reSizeFooter');
        for (let i=0;i<elems.length;i+=1){
            elems[i].style.display = 'none';
        }


        elems = document.getElementById("RenatoE")
        elems.innerText="Renato E."
        elems = document.getElementById("LucaR")
        elems.innerText="Rubino L."
    }
}

reSizeFooter()
