function cadena(persona) {

    return JSON.stringify(persona);

};

function newUser() {

    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    var ciudad = document.getElementById("ciudad").value;

    let usuario = {
        nombrePersona: nombre,
        apellidosPersona: apellidos,
        edadPersona: edad,
        ciudadPersona: ciudad
    }

    newRow(usuario);

    

};

function newRow(persona) {

    $("#tablaUsuarios").append("<tr>" +
        "<td>" + persona.nombrePersona + "</td>" +
        "<td>" + persona.apellidosPersona + "</td>" +
        "<td>" + persona.edadPersona + "</td>" +
        "<td>" + persona.ciudadPersona + "</td>" +
        "</tr>")


};



/*function newRow(usuarioObj){ 

    return "<tr>" + 
                    "<td>" + usuarioObj.nombreU + "</td>" +
                    "<td>" + usuarioObj.apellidosU + "</td>" +
                    "<td>" + usuarioObj.edadU + "</td>" + 
                    "<td>" + usuarioObj.ciudadU + "</td>" +
            "</tr>"; 

};
*/