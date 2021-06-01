
$("#test").click(function (){
    console.log("Test")
     $.ajax({
            url: "http://localhost:5000/test",
            type: "POST",
            data: {
                nome:  $("#_nome").val(),
                cognome: $("#_cognome").val(),
                email: $("#_regEmail").val(),
                password: $("#_regPassword").val(),
                data: $("#_data").val()
            }
     });

});