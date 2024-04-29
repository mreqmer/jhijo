let listaUsuarios = [];
let usuariosJSON;
let numeroUsuarios=0;
let sumaEdades=0;
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
        generaTabla(usuariosJSON);
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

function calculos(){

    sumaEdades = 0; 
    numeroUsuarios = 0;
    media = 0;
    edadMax = Number.MIN_SAFE_INTEGER;
    edadMin = Number.MAX_SAFE_INTEGER;
    edad = 0,
    
     listaUsuarios.forEach(objeto => {
        if (objeto !== null) {
            sumaEdades += objeto.edad;
            if (objeto.edad > edadMax) {
                edadMax = objeto.edad;
            }
            if (objeto.edad < edadMin) {
                edadMin = objeto.edad;
            }
            numeroUsuarios++;
        }
    });
    media = sumaEdades / numeroUsuarios;
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

function serializa(){

   let cadenaJSON = JSON.stringify(listaUsuarios);

    return cadenaJSON;
}

function hobbiesString(element){
    var cadena = element.hobbies.join( "<br>");
    
    return cadena;
}

