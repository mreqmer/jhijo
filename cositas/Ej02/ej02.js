let numeroUsuarios=0;
let sumaEdades=0;
let media=0;
let edadMax = Number.MIN_SAFE_INTEGER;
let edadMin = Number.MAX_SAFE_INTEGER;

function newUser() {

    //objeto usuario
    let usuario = {
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        edad: parseInt($("#edad").val()),
        ciudad: $("#ciudad").val()
    }

   
    if(datosCorrectos(usuario)){

        newRow(usuario);
        numeroUsuarios++;
        sumaEdades += usuario.edad;
        media = sumaEdades / numeroUsuarios;
        edadMin = min(usuario, edadMin);
        edadMax = max(usuario, edadMax);
        estadisticas();
    }else{
        alert("Faltan datos");
    }
};

//al borrar un tr no modifica datos de la sumaEdades, etc ya que está calculado a lo bruto
function newRow(persona) {

    $("#tablaUsuarios").append("<tr onclick=\"deleteRow(this)\"> " +
        "<td>" + persona.nombre + "</td>" +
        "<td>" + persona.apellidos + "</td>" +
        "<td>" + persona.edad + "</td>" +
        "<td>" + persona.ciudad + "</td>" +
        "</tr>")
};

//borra filas de la tabla
function deleteRow(row){
    $(row).remove();
}

//comprueba que estén todos los campos rellenos
function datosCorrectos(persona){

    let correcto = false;

    if(persona.nombre != "" && persona.apellidos != "" && persona.edad > 0 && persona.ciudad != ""){

        correcto = true;

    }

    return correcto;

};

//edad mínima
function min(persona, minimo) {
    let minimoActual = minimo;
    
    if(persona.edad < minimoActual){
        minimoActual = persona.edad
    }
    return minimoActual;
} 

//edad máxima
function max(persona, maximo) {
    let maximoActual = maximo;

    if(persona.edad > maximoActual){
        maximoActual = persona.edad;
    }

    return maximoActual;
}

//inserta las estadísticas de edades
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


