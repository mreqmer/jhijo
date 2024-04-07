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
  
    console.log(usuario.nombrePersona);

    if(!usuario.nombrePersona.value === "" && !usuario.apellidosPersona.value === "" && !usuario.edadPersona.value === "" && !usuario.ciudadPersona.value === ""){

        console.log("Rastrojo");
        newRow(usuario);
        
    }
   


};

function newRow(usuario) {

    $("#tablaUsuarios").append("<tr>" +
        "<td>" + usuario.nombrePersona + "</td>" +
        "<td>" + usuario.apellidosPersona + "</td>" +
        "<td>" + usuario.edadPersona + "</td>" +
        "<td>" + usuario.ciudadPersona + "</td>" +
        "</tr>")

};


