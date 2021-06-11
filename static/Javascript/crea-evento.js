let marker
let map
function loadMap(){
    //Vista sull'italia
     map = L.map('mapID').setView([40.856725, 14.284556], 5)
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    marker = L.marker([40.856725, 14.284556], {draggable:true}).addTo(map).on("dragend",function (e){
           let coord = String(marker.getLatLng())
           // console.log(coord + "type:" + typeof coord)
            //console.log(coord)
             lat = coord.substring([coord.indexOf('(') + 1], [coord.indexOf(' ') - 1])
             lon = coord.substring([coord.indexOf(' ') + 1], [coord.indexOf(' ') + 10])
            // se presenti virgole o tonde o spazi vuoti vanno tolte
            if ( lat.indexOf(',') != -1 ){
            lat = lat.replace(',', '')
            }
            if (lat.indexOf(')') != -1 ){
            lat = lat.replace(')', '')
            }
            if (lat.indexOf('(') != -1 ){
            lat = lat.replace('(', '')
            }
            if ( lon.indexOf(',') != -1 ){
            lon = lon.replace(',', '')
            }
            if (lon.indexOf(')') != -1 ){
            lon = lon.replace(')', '')
            }
            if (lon.indexOf('(') != -1 ){
            lon = lon.replace('(', '')
            }
            $("#lat").attr("value",lat)
            $("#lon").attr("value",lon)

        });
}


function chooseAddr(lat1, lng1)
{
 marker.closePopup();
 map.setView([lat1, lng1],18);
 marker.setLatLng([lat1, lng1]);
 lat = lat1.toFixed(8);
 lon = lng1.toFixed(8);
 $("#lat").attr("value",lat)
 $("#lon").attr("value",lon)
}

function myFunction(arr)
{
 var out = "<br />";
 var i;

 if(arr.length > 0)
 {
  for(i = 0; i < arr.length; i++)
  {
   out += "<div class='address' title='Show Location and Coordinates' onclick='chooseAddr(" + arr[i].lat + ", " + arr[i].lon + ");return false;'>" + arr[i].display_name + "</div>";
  }
  document.getElementById('results').innerHTML = out;
 }
 else
 {
  document.getElementById('results').innerHTML = "Nessun risultato...";
 }

}


function addr_search()
{
 var inp = document.getElementById("addr");
 var xmlhttp = new XMLHttpRequest();
 var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp.value;
 xmlhttp.onreadystatechange = function()
 {
   if (this.readyState == 4 && this.status == 200)
   {
    var myArr = JSON.parse(this.responseText);
    myFunction(myArr);
   }
 };
 xmlhttp.open("GET", url, true);
 xmlhttp.send();
}


$(document).ready(function (){

    addr_search()
    loadMap()


    $('#mappa').click(function (){
        if ($(this).prop('checked')){
            $("#sezioneMappa").removeClass("_ds-none")
        }
        else{
            $("#sezioneMappa").addClass("_ds-none")
            lat = 0
            lon = 0
            $("#lat").attr("value",lat)
            $("#lon").attr("value",lon)
        }
    })

})


