let listaUsuarios = [];
let usuariosJSON = [];
let numeroUsuarios=0;
let sumaEdades;
let media=0;
let edadMax = Number.MIN_SAFE_INTEGER;
let edadMin = Number.MAX_SAFE_INTEGER;

$('input:checkbox').on('change', function() {
    if($('input:checkbox[name="hobbies"]').filter(':checked').length > 3){
        alert("Selecciona un máximo de 3 hobbies");
        $(this).prop('checked', false);
    }
    });

function newUser() {

    //se puede hacer con las dos formas, la mejor es el de nombre con jquery
    var nombre = $("#nombre").val();
    var apellidos = document.getElementById("apellidos").value;
    var edad = parseInt(document.getElementById("edad").value);
    var ciudad = document.getElementById("ciudad").value;
    var listaHobbies = $('input[name="hobbies"]')
        .filter(':checked')
        .map(function () {
              return $(this).val();
         }
        ).get();

    let usuario = {
        nombrePersona: nombre,
        apellidosPersona: apellidos,
        edadPersona: edad,
        ciudadPersona: ciudad,
        hobbiesPersona : listaHobbies
    }

    

    if(datosCorrectos(usuario)){
    
        
        anadeUsuario(usuario);
        usuariosJSON = serializa();
        envio(usuariosJSON)
        generaTabla(usuariosJSON);

        numeroUsuarios++;
        insertaEstadisticas();

        

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
                                "<th>Hobies</th>"+
                                "</tr>" +
                        "</thead>" +
                        "<tbody id=\"tablaUsuarios\">" +
                        "</tbody>" +
                    "</table>"

    $("#tabla").html(htmlTabla);

    
    listaDescerializada.forEach(
        newRow
    );
}

function newRow(element) {
    // Construye la fila como un objeto jQuery
    let fila =  $("#tablaUsuarios").append("<tr onclick=\"deleteRow(this)\"> " +
                    "<td>" + element.nombrePersona + "</td>" +
                    "<td>" + element.apellidosPersona + "</td>" +
                    "<td>" + element.edadPersona + "</td>" +
                    "<td>" + element.ciudadPersona + "</td>" +
                    "<td>" + hobbiesString(element) + "</td>"+
                "</tr>");

    // Añade la fila al contenedor
    $("#tablaUsuarios").append(fila);

    // Devuelve la fila construida
    return fila;
}

function deleteRow(row){
    $(row).remove();
}

function datosCorrectos(persona){

    let correcto = false;

    if(persona.nombrePersona != "" && persona.apellidosPersona != "" && persona.edadPersona > 0 && persona.ciudadPersona != ""){

        correcto = true;
        
    }

    return correcto;

};

function calculos(){

    sumaEdades = 0; 
    numeroUsuarios = 0;
    media = 0;
    
    listaUsuarios.forEach(objeto => {
    sumaEdades += objeto.edadPersona;

    if(objeto.edadPersona > edadMax){
        edadMax = objeto.edadPersona;
    }
    if(objeto.edadPersona < edadMin){
        edadMin = objeto.edadPersona;
    }

    if(objeto!=null){
        numeroUsuarios++;
    }

    })
    
    media = sumaEdades/numeroUsuarios;
}

function insertaEstadisticas(){

    calculos();

    $("#estadisticas").html("<p>" + "Suma: " + sumaEdades +
    "<br>" + "Media: " + media +
    "<br>" + "Mínimo: " + edadMin + 
    "<br>" + "Máximo: " + edadMax + "</p>");
}

function anadeUsuario(persona){

    listaUsuarios.push(persona);

}

function deleteUser(){
    listaUsuarios.forEach()
}

function solicitud(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://lm.iesnervion.es/eco.php");
    xhr.responseType = "json"; // Si no se indica, necesitará parseo

// Preparamos a continuación la recepción
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = xhr.response;
            console.log(data);
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send();
}


function envio(objeto_js){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lm.iesnervion.es/eco.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Preparamos a continuación la respuesta
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 201) { // 200 || 201
            console.log(JSON.parse(xhr.responseText));
        } else {
            console.log("Error: ${xhr.status}");
        }
    };
    xhr.send(objeto_js);
}



function serializa(){

   let cadenaJSON = JSON.stringify(listaUsuarios);

    return cadenaJSON;
}

function hobbiesString(element){
        var cadena = element.hobbiesPersona.join( "<br>");
        
        return cadena;
}

