let listaUsuarios = [];
let usuariosJSON;
let datos;

$('input:checkbox').on('change', function() {
    if($('input:checkbox[name="hobbies"]').filter(':checked').length > 3){
        alert("Selecciona un máximo de 3 hobbies");
        $(this).prop('checked', false);
    }
});

function newUser() {

     var listaHobbies = listaHobbies = $('input[name="hobbies"]')
                                        .filter(':checked')
                                        .map(function () {
                                        return $(this).val();
                                        }
                                        ).get()                                

    //objeto usuario
     let usuario = {
    nombre: $("#nombre").val(),
    apellidos: $("#apellidos").val(),
    edad: parseInt($("#edad").val()),
    ciudad: $("#ciudad").val(),
    hobbies: listaHobbies
    }

    if(datosCorrectos(usuario)){
        anadeUsuario(usuario);
        usuariosJSON = serializa();
        envio(usuariosJSON);
        generaTabla(usuariosJSON);
        
    }else{
        alert("Faltan datos");
    }


};

//genera la tabla del html
function generaTabla(usuariosJSON){

    let listaDescerializada = JSON.parse(usuariosJSON);

    
    let htmlTabla = "<table>" +
                         "<thead>" + 
                            "<tr>" +
                                "<th>Nombre</th>" +
                                "<th>Apellidos</th>" +
                                "<th>Edad</th>" +
                                "<th>Ciudad</th>" +
                                "<th>Hobbies</th>" +
                                "</tr>" +
                        "</thead>" +
                        "<tbody id=\"tablaUsuarios\">" +
                        "</tbody>" +
                    "</table>"

    $("#tabla").html(htmlTabla);

    
    for (let i=0; i<listaUsuarios.length; i++){
        newRow(listaUsuarios[i], i)
    };
}

function newRow(element, indice) {
    // Construye la fila como un objeto jQuery
    let fila =  $("#tablaUsuarios").append("<tr id=\"fila_" + indice + "\" onclick=\"deleteUser(" + indice + ")\">"  +
                    "<td>" + element.nombre + "</td>" +
                    "<td>" + element.apellidos + "</td>" +
                    "<td>" + element.edad + "</td>" +
                    "<td>" + element.ciudad + "</td>" +
                    "<td>" + hobbiesString(element) + "</td>" +
                "</tr>");

    // Añade la fila al contenedor
    $("#tablaUsuarios").append(fila);

    // Devuelve la fila construida
    return fila;
}


function deleteUser(indice) {
    listaUsuarios.splice(indice, 1);
    $("#fila_" + indice).remove();
    insertaEstadisticas();
}

function datosCorrectos(persona){

    let correcto = false;

    if(persona.nombre != "" && persona.apellidos != "" && persona.edad > 0 && persona.ciudad != ""){

        correcto = true;

    }

    return correcto;

};


function insertaEstadisticas(datos){
   // console.log(datos.calculos);

   $("#estadisticas").html("<p>" + "Suma: " + datos.calculos["suma"] +
    "<br>" + "Media: " + datos.calculos["media"] +
    "<br>" + "Mínimo: " + datos.calculos["min"] + 
    "<br>" + "Máximo: " + datos.calculos["max"] + "</p>");
}

function anadeUsuario(persona){

    listaUsuarios.push(persona);

}

function serializa(){

   let cadenaJSON = JSON.stringify(listaUsuarios);

    return cadenaJSON;
}

function hobbiesString(element){
    var cadena = element.hobbies.join( "<br>");
    
    return cadena;
}

function envio(objeto_js){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lm.iesnervion.es/eco.php");
    xhr.responseType = "json";

// Preparamos a continuación la respuesta
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 201) { // 200 || 201
           datos = xhr.response;
           insertaEstadisticas(datos);
           console.log(datos.calculos["suma"])
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send(objeto_js);
}



