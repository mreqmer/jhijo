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

        newRow(usuario);
        numeroUsuarios++;
        sumaEdades += usuario.edadPersona;
        media = sumaEdades / numeroUsuarios;
        edadMin = min(usuario, edadMin);
        edadMax = max(usuario, edadMax);
        estadisticas();

       
    }else{
        alert("Faltan datos");
    }


};

function newRow(persona) {

    $("#tablaUsuarios").append("<tr>" +
        "<td>" + persona.nombrePersona + "</td>" +
        "<td>" + persona.apellidosPersona + "</td>" +
        "<td>" + persona.edadPersona + "</td>" +
        "<td>" + persona.ciudadPersona + "</td>" +
        "</tr>")


};

function datosCorrectos(persona){

    let correcto = false;

    if(persona.nombrePersona != "" && persona.apellidosPersona != "" && persona.edadPersona > 0 && persona.ciudadPersona != ""){

        correcto = true;

    }

    return correcto;

};

function min(persona, minimo) {
    let minimoActual = minimo;
    
    if(persona.edadPersona < minimoActual){
        minimoActual = persona.edadPersona;
    }
    return minimoActual;
} 

function max(persona, maximo) {
    let maximoActual = maximo;

    if(persona.edadPersona > maximoActual){
        maximoActual = persona.edadPersona;
    }

    return maximoActual;
}

function estadisticas(){
    $("#estadisticas").html("<p>" + "Suma: " + sumaEdades +
    "<br>" + "Media: " + media +
    "<br>" + "Mínimo: " + edadMin + 
    "<br>" + "Máximo: " + edadMax + "</p>");
}




/*function newRow(usuarioObj){ 

    return "<tr>" + 
                    "<td>" + usuarioObj.nombreU + "</td>" +
                    "<td>" + usuarioObj.apellidosU + "</td>" +
                    "<td>" + usuarioObj.edadU + "</td>" + 
                    "<td>" + usuarioObj.ciudadU + "</td>" +
            "</tr>"; 

};
*/


