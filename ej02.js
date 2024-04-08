let numeroUsuarios;
let sumaEdades;
let media;
let edadMax = Number.MIN_SAFE_INTEGER;
let edadMin = Number.MAX_SAFE_INTEGER;

function newUser() {

    //se puede hacer con las dos formas, unos es el de nombre es el de jquery
    var nombre = $("#nombre").val();
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
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
        this.sumaEdades += usuario.edadPersona;
        this.media = this.sumaEdades / this.numeroUsuarios;
        this.edadMin = min(usuario, this.edadMin);
        this.edadMax = max(usuario, this.edadMax);
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

    if(persona.nombrePersona != "" && persona.apellidosPersona != "" && persona.edadPersona != "" && persona.ciudadPersona != ""){

        correcto = true;


    }

    return correcto;

};

function min(persona, min){

    let minimo;
    
    if(persona.edadPersona < min){
        minimo = persona.edadPersona;
    }
    return minimo;

} 

function max(persona, max){
    let maximo;

    if(persona.edadPersona > max){
        maximo = persona.edadPersona;
    }

    return maximo;
}

function estadisticas(){
    return  $("#estadisticas").html("<p>" + "Suma: " + this.sumaEdades +
    "<br>" + "Media: " + this.media +
    "<br>" + "Mínimo: " + this.min + 
    "<br>" + "Máximo" + this.max);
   

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


