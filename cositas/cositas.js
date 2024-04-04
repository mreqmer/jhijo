function toString(usuario){
    return JSON.stringify(usuario);
};

//deserialización de datos para mostrarlos en la tabla
function newUser(){

    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    var ciudad = document.getElementById("ciudad").value;

    //crea el objeto usuario
    let usuario = {
        nombreU : nombre,
        apellidosU : apellidos,
        edadU : edad,
        ciudadU : ciudad
    }

    //convierte el JSON el objeto 
    let usuarioCadena = toString(usuario);

    let usuarioObj = newUser(usuarioCadena);

    $("tbody").append(newRow(usuarioObj));

};

function newRow(usuarioObj){ 

    return "<tr>" + 
                    "<td>" + usuarioObj.nombreU + "</td>" +
                    "<td>" + usuarioObj.apellidosU + "</td>" +
                    "<td>" + usuarioObj.edadU + "</td>" + 
                    "<td>" + usuarioObj.ciudadU + "</td>" +
            "</tr>"; 

};