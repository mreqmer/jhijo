
let listaUsuarios = [];
let usuariosJSON;

let numeroUsuarios=0;
let sumaEdades=0;
let media=0;
let edadMax = Number.MIN_SAFE_INTEGER;
let edadMin = Number.MAX_SAFE_INTEGER;

function newUser() {

    //se puede hacer con las dos formas, la mejor es el de nombre con jquery
    var nombre = $("#nombre").val();
    var apellidos = document.getElementById("apellidos").value;
    var edad = parseInt(document.getElementById("edad").value);
    var ciudad = document.getElementById("ciudad").value;

    let usuario = {
        nombrePersona: nombre,
        apellidosPersona: apellidos,
        edadPersona: edad,
        ciudadPersona: ciudad
    }

    

    if(datosCorrectos(usuario)){
    
        anadeUsuario(usuario);
        usuariosJSON = serializa();

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



function insertaEstadisticas(){
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

function findUser(){
    var indice = listaUsuarios.findIndex()
}


function serializa(){

   let cadenaJSON = JSON.stringify(listaUsuarios);

    return cadenaJSON;
}
