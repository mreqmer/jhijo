
let listaUsuarios = [];

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

function generaTabla(){

    let listadoPersona = JSON.parse(serializa(listaUsuarios));
    
    let htmlTabla = "<table>" +
                         "<thead>" + 
                            "<tr>" +
                                "<th>Nombre</th>" +
                                "<th>Apellidos</th>" +
                                "<th>Edad</th>" +
                                "<th>Ciudad</th>" +
                                "</tr>" +
                        "</thead>" +
                        "<tbody id='tablaUsuarios'>" +
                        "</tbody>" +
                    "</table>"

    $("#tabla").html(htmlTabla);

    foreach(){
        newRow(listadopersona)
    }

    

}

function newRow(listadoPersona) {

   //esto está asi para borrar todo lo anterior ya que si ponemos en el for each html hace cosas raras y si no ponemos el html con "" se genera el array completo cada vez
   $("#tablaUsuarios").html("");
    //si pones append se añade todo el rato, si pones html se añade y se borra cada vez
    listadoPersona.forEach(element => {$("#tablaUsuarios").append("<tr>" +
                                        "<td>" + element.nombrePersona + "</td>" +
                                        "<td>" + element.apellidosPersona + "</td>" +
                                        "<td>" + element.edadPersona + "</td>" +
                                        "<td>" + element.ciudadPersona + "</td>" +
                                        "</tr>")});

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

function anadeUsuario(persona){

    listaUsuarios.push(persona);

}

function serializa(){

   let cadenaJSON = JSON.stringify(listaUsuarios);

    return cadenaJSON;
}