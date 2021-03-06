function existeListaUsuarios() {
    let existe = false;
    if (localStorage.getItem("Usuarios") != null) {
        existe = true;
    }
    return existe;
}

function crearListaUsuarios() {
    localStorage.setItem("Usuarios", JSON.stringify([]));
}

function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem("Usuarios"));
}

function guardarUsuarios(listaDeUsuarios) {
    localStorage.setItem("Usuarios", JSON.stringify(listaDeUsuarios));
}

class Persona {
    constructor(usuarioNuevo) {
        this.nombre = usuarioNuevo.nombre;
        this.apellido = usuarioNuevo.apellido;
        this.dni = usuarioNuevo.dni;
        this.telefono = usuarioNuevo.telefono;
        this.email = usuarioNuevo.email;
    }
}

function cargarUsuario(usuarioACargar) {
    const arrayDeStorage = obtenerUsuarios();
    const dniIngresado = usuarioACargar["dni"];
    let marcador = null;
    for (const contenidoArrayStorage of arrayDeStorage) {
        for (const usuarioDeStorage in contenidoArrayStorage) {
            if (contenidoArrayStorage[usuarioDeStorage] == dniIngresado) {
                marcador = "existe";
                break;
            }
        }
    }
    if (marcador != "existe") {
        arrayDeStorage.push(usuarioACargar);
        guardarUsuarios(arrayDeStorage);
    }
}

function mostrarDatosPersonales() {
    $("#datos").text("Los Datos que ingresaste fueron los siguientes: ");
    const ulDatos = $("#listaDatos");
    const nombre = $("#nombre");
    const apellido = $("#apellido");
    const dni = $("#dni");
    const telefono = $("#telefono");
    const email = $("#email");
    a = nombre.length;
    ulDatos.append(`<li><strong>Nombre y Apellido: </strong> ${nombre.val()} ${apellido.val()}</li>`);
    ulDatos.append(`<li><strong>DNI: </strong>${dni.val()}</li>`);
    ulDatos.append(`<li><strong>Teléfono: </strong>${telefono.val()}</li>`);
    ulDatos.append(`<li><strong>Email: </strong>${email.val()}</li>`);
    $("#datosDeEquipos").text("Por Favor llena el siguiente formulario con la información correspondiente:");
    $("#datosPersonales").html(`<p><strong>- Cliente: </strong>${nombre.val()} ${apellido.val()}</p>
    <p><strong>- DNI: </strong>${dni.val()}</p>
    <p><strong>- Teléfono: </strong>${telefono.val()}</p>
    <p><strong>- Email: </strong>${email.val()}</p>`);
}

class Servicio {
    constructor(nombreServicio, precio, horas, total) {
        this.nombreServicio = nombreServicio;
        this.precio = precio;
        this.horas = horas;
        this.total = total;
    }
    final() {
        this.total = this.precio * this.horas;
        this.total = this.total * 1.21;
    }
}

function obtenerDatosServicio() {
    if ($("#checkFormateo").prop('checked') == true) {
        serviciosJuntos.push($("#checkFormateo").val());
    }
    if ($("#checkProgramas").prop('checked') == true) {
        serviciosJuntos.push($("#checkProgramas").val());
    }
    if ($("#checkVirus").prop('checked') == true) {
        serviciosJuntos.push($("#checkVirus").val());
    }
    if ($("#checkRevision").prop('checked') == true) {
        serviciosJuntos.push($("#checkRevision").val());
    }
}

function suma(n1) {
    final += n1;
}

function calculoValorServicios(equipoAArreglar) {
    let i = 0;
    i = serviciosJuntos.length;
    for (f = 0; f < serviciosJuntos.length; f++) {
        switch (serviciosJuntos[f]) {
            case "Formateo":
                const formateo = new Servicio(serviciosJuntos[f], 200, 8, 0)
                formateo.final()
                suma(formateo.total);
                break;
            case "Instalación de Programas":
                const programas = new Servicio(serviciosJuntos[f], 180, 4, 0)
                programas.final()
                suma(programas.total);
                break;
            case "Limpieza de Virus":
                const virus = new Servicio(serviciosJuntos[f], 150, 2, 0)
                virus.final()
                suma(virus.total);
                break;
            case "Revisión":
                const revision = new Servicio(serviciosJuntos[f], 120, 2, 0)
                revision.final()
                suma(revision.total);
                break;
        }
    }
    const parrafoDatosEquipo = $("#datosEquipo");
    parrafoDatosEquipo.html(`<p><strong>- Equipo: </strong>${equipoAArreglar}</p>`);
}

function obtenerDatosEquipo() {
    const equipoSeleccionado = $("#tipoDeComputadora option:selected").val();
    return equipoSeleccionado;
}

function metodoDeContacto() {
    let viaDeContacto = null;
    if ($("#checkTelefono").prop('checked') == true) {
        viaDeContacto = $("#checkTelefono").val();
    }
    if ($("#checkEmail").prop('checked') == true) {
        viaDeContacto = $("#checkEmail").val();
    }
    return viaDeContacto;
}

class Cotizacion {
    constructor(cupon, totalPagar) {
        this.cupon = cupon;
        this.totalPagar = totalPagar;
    }
    descuento() {
        const desct = (a, b) => a * b;
        let nombreCupon = null;
        let porct = 0;
        switch (this.cupon) {
            case "DCTO10":
                porct = 0.9
                nombreCupon = "10%";
                dct = desct(this.totalPagar, porct);
                break;
            case "DCTO20":
                porct = 0.8
                nombreCupon = "20%";
                dct = desct(this.totalPagar, porct);
                break;
            case "DCTO30":
                porct = 0.7
                nombreCupon = "30%";
                dct = desct(this.totalPagar, porct);
                break;
            default:
                break;
        }
        return nombreCupon;
    }
    subtotal(nombreCupon, contacto) {
        let enDolares = 0;
        let descuentoTotal = null;
        let totalDolares = null;
        let finalTotal = null;
        if (dct != null) {
            descuentoTotal = dct.toString();
            descuentoTotal = descuentoTotal.slice(0, 6)
            enDolares = (dct / parseInt(misDatos.casa.venta));
            totalDolares = enDolares.toString();
            totalDolares = totalDolares.slice(0, 4);
            $("#costoServicio").html(`<p>El total a pagar con el IVA incluido y el descuento por cupón aplicado de ${nombreCupon} es: <strong>${descuentoTotal}</strong> ARS o <strong>${totalDolares}</strong> USD</p>`);
        }
        else {
            enDolares = (this.totalPagar / parseInt(misDatos.casa.venta));
            finalTotal = this.totalPagar.toString();
            finalTotal = finalTotal.slice(0, 6)
            totalDolares = enDolares.toString();
            totalDolares = totalDolares.slice(0, 4);
            $("#costoServicio").html(`<p>El total a pagar con el IVA incluido es: <strong>${finalTotal}</strong> ARS o <strong>${totalDolares}</strong> USD</p>`);
        }
        $("#contactoMetodo").html(`<p>Te estaremos contactando vía ${contacto}... ¡Muchas gracias!</p>`);
    }
}

function cuponDescuento(contMet) {
    const cuponIngresado = $("#cupon").val();
    const cotizacionFinal = new Cotizacion(cuponIngresado, final);
    nombCup = cotizacionFinal.descuento();
    cotizacionFinal.subtotal(nombCup, contMet);
}

function textoObservaciones() {
    const observaciones = $("#observaciones").val();
    if (observaciones.length > 14) {
        $("#observacionesCliente").html(`<p><strong>Observaciones: </strong>${observaciones}</p>`);
        $("#errorObservaciones").text("");
    }
}

function agregarAlButtonModal() {
    if ((nombre.val().length >= 4) && (apellido.val().length >= 4) && (dni.val().length == 8) && (email.val().length >= 8) && (arroba == true) && (com == true) && (telefono.val().length >= 10)) {
        $("#guardar").attr({
            "data-bs-target": "#toDatosEquipo",
            "data-bs-toggle": "modal",
            "data-bs-dismiss": "modal",
        });
        $("#errorValidacion").text("");
        seguir = 1;
    }
}

function agregarAlButtonModal2() {
    serviciosJuntos.length = 0;
    let validarEquipo = obtenerDatosEquipo()
    obtenerDatosServicio();
    let validarContacto = metodoDeContacto();
    textoObservaciones();
    if ((validarEquipo != "Selecciona") && (serviciosJuntos.length != 0) && (validarContacto != null) && ($("#observaciones").val().length) > 14) {
        $("#enviar").attr({
            "data-bs-target": "#mostrarResultados",
            "data-bs-toggle": "modal",
            "data-bs-dismiss": "modal",
        });
        seguir2 = 1;
    }
}

const serviciosJuntos = [];
let final = 0;
let dct = null;
let seguir = 0;
let seguir2 = 0;
let misDatos = null;
const nombre = $("#nombre");
const apellido = $("#apellido");
const dni = $("#dni");
const email = $("#email");
const telefono = $("#telefono");


// Validaciones Formulario Cotizacion Modal 1
$("#nombre").blur(function () {
    if (nombre.val().length >= 4 && isNaN(nombre.val()) == true) {
        $("#nombre").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if ((nombre.val().length < 4) || (isNaN(nombre.val()) == false)) {
        $("#nombre").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
});
$("#apellido").blur(function () {
    if ((apellido.val().length >= 4) && (isNaN(apellido.val()) == true)) {
        $("#apellido").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if ((apellido.val().length < 4) || (isNaN(apellido.val()) == false)) {
        $("#apellido").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
});
$("#dni").blur(function () {
    if (dni.val().length == 8) {
        $("#dni").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (dni.val().length != 8) {
        $("#dni").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
});
let arroba = null;
let com = null;
$("#email").blur(function () {
    arroba = email.val().includes("@");
    com = email.val().includes(".com");

    if (email.val().length >= 8 && arroba == true && com == true) {
        $("#email").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (email.val().length < 8 || arroba == false || com == false) {
        $("#email").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
});
$("#telefono").blur(function () {
    if (telefono.val().length >= 10) {
        $("#telefono").attr({
            "class": "form-control is-valid"
        });
        agregarAlButtonModal();
    }
    else if (telefono.val().length < 10) {
        $("#telefono").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
});

// Validaciones Cotizacion Modal 2
$("#tipoDeComputadora").click(function () {
    if ($("#tipoDeComputadora option:selected").val() == "Selecciona") {
        $("#tipoDeComputadora").attr({
            "class": "form-select form-select-sm mb-3 espacioCuadro is-invalid"
        });
    }
    else {
        $("#tipoDeComputadora").attr({
            "class": "form-select form-select-sm mb-3 espacioCuadro is-valid"
        });
    }
});

$("#checkTelefono").click(function () {
    if (($("#checkTelefono").prop('checked') == false)) {
        $("#errorSeleccionContacto").text("Por Favor Seleccione un método de contacto");
    }
    else {
        $("#errorSeleccionContacto").text("");
        agregarAlButtonModal2();
    }
})
$("#checkEmail").click(function () {
    if (($("#checkEmail").prop('checked') == false)) {
        $("#errorSeleccionContacto").text("Por Favor Seleccione un método de contacto");
    }
    else {
        $("#errorSeleccionContacto").text("");
        agregarAlButtonModal2();
    }
})

$("#observaciones").blur(function () {
    if ($("#observaciones").val().length < 14) {
        $("#observaciones").attr({
            "class": "form-control is-invalid"
        });
        $("#errorObservaciones").text("Por Favor ingrese al menos 15 caracteres");
    }
    else {
        $("#observaciones").attr({
            "class": "form-control is-valid"
        });
        $("#errorObservaciones").text("");
        agregarAlButtonModal2();
    }
});

$(".check").click(function () {
    const checkFormat = $("#checkFormateo").prop('checked');
    const checkProgram = $("#checkProgramas").prop('checked');
    const checkVir = $("#checkVirus").prop('checked');
    const checkRev = $("#checkRevision").prop('checked');

    if ((checkFormat == true) || (checkProgram == true) || (checkVir == true) || (checkRev == true)) {
        $("#errorSeleccionServicios").text("");
        agregarAlButtonModal2();
    }
    else {
        $("#errorSeleccionServicios").text("Por Favor Seleccione al menos un Servicio");
    }
});

//Eventos Click Boton Modal Siguiente
$("#modalUnoCotizacion").click(function () {
    const URLGETDOLAR = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
    $.get(URLGETDOLAR, function (respuesta, estado) {
        if (estado === "success") {
            misDatos = respuesta[1];
            $("#cotizacionDolar").html(`<strong>${misDatos.casa.nombre}: </strong>${misDatos.casa.venta} ARS`)
        }
    });
    const URLGETFECHA = 'https://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires'
    $.get(URLGETFECHA, function (respuesta2, estado) {
        if (estado === "success") {
            var cadenaFecha = respuesta2.datetime.split("T");
            var separaHora = cadenaFecha[1].split(".");
            var horaFinal = separaHora[0].slice(0, 5);
            $("#fechaCotizacion").html(`<strong>Fecha: </strong>${cadenaFecha[0]}`)
            $("#horaCotizacion").html(`<strong>Hora: </strong>${horaFinal} hs`)
        }
    });
});
$("#guardar").click(function () {
    if (!existeListaUsuarios()) {
        crearListaUsuarios();
    }

    const nuevoUsuario = new Persona({
        nombre: nombre.val(),
        apellido: apellido.val(),
        dni: dni.val(),
        telefono: telefono.val(),
        email: email.val()
    });
    if (nombre.val().length < 4) {
        $("#nombre").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
    if (apellido.val().length < 4) {
        $("#apellido").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
    if (dni.val().length != 8) {
        $("#dni").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
    if (telefono.val().length < 10) {
        $("#telefono").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }
    if (email.val().length < 8 || arroba == false || com == false) {
        $("#email").attr({
            "class": "form-control is-invalid"
        });
        $("#errorValidacion").text("Por Favor ingrese correctamente los campos");
    }

    if (seguir == 1) {
        mostrarDatosPersonales();
        cargarUsuario(nuevoUsuario);
    }
});

$("#enviar").click(function () {

    agregarAlButtonModal2();
    if ($("#tipoDeComputadora option:selected").val() == "Selecciona") {
        $("#tipoDeComputadora").attr({
            "class": "form-select form-select-sm mb-3 espacioCuadro is-invalid"
        });
    }
    else {
        $("#tipoDeComputadora").attr({
            "class": "form-select form-select-sm mb-3 espacioCuadro is-valid"
        });
    }
    if (($("#checkFormateo").prop('checked') == true) || ($("#checkProgramas").prop('checked') == true) || ($("#checkVirus").prop('checked') == true) || ($("#checkRevision").prop('checked') == true)) {
        $("#errorSeleccionServicios").text("");
    }
    else {
        $("#errorSeleccionServicios").text("Por Favor Seleccione al menos un Servicio");
    }
    if (($("#checkTelefono").prop('checked') == false) && ($("#checkEmail").prop('checked') == false)) {
        $("#errorSeleccionContacto").text("Por Favor Seleccione un método de contacto");
    }
    else {
        $("#errorSeleccionContacto").text("");
    }
    if ($("#observaciones").val().length < 14) {
        $("#observaciones").attr({
            "class": "form-control is-invalid"
        });
        $("#errorObservaciones").text("Por Favor ingrese al menos 15 caracteres");
    }
    else {
        $("#observaciones").attr({
            "class": "form-control is-valid"
        });
        $("#errorObservaciones").text("");
    }

    if (seguir2 == 1) {
        serviciosJuntos.length = 0;
        final = 0;
        let equipo = obtenerDatosEquipo();
        obtenerDatosServicio();
        calculoValorServicios(equipo);
        const parrafoDatosServicios = $("#datosServicios");
        parrafoDatosServicios.html(`<p><strong>- Servicios: </strong>${serviciosJuntos.join(", ")}</p>`);
        contMet = metodoDeContacto();
        cuponDescuento(contMet);
        textoObservaciones();
    }
});

//Animaciones para cuadros de Servicios
$("#cuadro1").click(function () {
    $("#cuadro2").fadeOut(200);
    $("#cuadro3").fadeOut(200);
    $("#cuadro4").fadeOut(200);
    $("#cuadro1").css({
        "color": "midnightblue",
        "width": "auto"
    })
    $("#parrafoMantenimiento").text("Si su equipo funciona correctamente, debe darle mantenimiento preventivo para mantener su computadora segura y funcionando correctamente. No espere una avería irreversible.")
    $("#parrafoMantenimiento").toggle(500, function () {
        $('html, body').animate({
            scrollTop: $("#cuadro1").offset().top
        }, 500);
        $("#cuadro2").fadeIn(200);
        $("#cuadro3").fadeIn(200);
        $("#cuadro4").fadeIn(200);
    });

});
$("#cuadro2").click(function () {
    $("#cuadro1").fadeOut(200);
    $("#cuadro3").fadeOut(200);
    $("#cuadro4").fadeOut(200);
    $("#cuadro2").css({
        "color": "midnightblue",
        "width": "auto"
    })
    $("#parrafoReparacionSoft").text("Damos mantenimiento correctivo completo a su(s) equipo(s), desde el respaldo, formateo e instalación de los programas necesarios para el correcto funcionamiento de una computadora. ¡Podemos ayudarlo con la avería de su software!")
    $("#parrafoReparacionSoft").toggle(500, function () {
        $("#cuadro1").fadeIn(200);
        $('html, body').animate({
            scrollTop: $("#cuadro2").offset().top
        }, 500);
        $("#cuadro3").fadeIn(200);
        $("#cuadro4").fadeIn(200);
    });

});
$("#cuadro3").click(function () {
    $("#cuadro1").fadeOut(200);
    $("#cuadro2").fadeOut(200);
    $("#cuadro4").fadeOut(200);
    $("#cuadro3").css({
        "color": "midnightblue",
        "width": "auto"
    })
    $("#parrafoReparacionHard").text("Cambio de partes, reemplazo de discos, ampliación de su memoria RAM, limpieza de componentes en el cerebro de su máquina (CPU) y sus accesorios: como teclados, procesadores, tarjetas, entre otros. Contamos con el servicio que su hardware necesita.")
    $("#parrafoReparacionHard").toggle(500, function () {
        $("#cuadro1").fadeIn(200);
        $("#cuadro2").fadeIn(200);
        $('html, body').animate({
            scrollTop: $("#cuadro3").offset().top
        }, 500);
        $("#cuadro4").fadeIn(200);
    });
});
$("#cuadro4").click(function () {
    $("#cuadro1").fadeOut(200);
    $("#cuadro3").fadeOut(200);
    $("#cuadro2").fadeOut(200);
    $("#cuadro4").css({
        "color": "midnightblue",
        "width": "auto"
    });
    $("#parrafoRedes").text("¿Buscas complementar el servicio técnico de los ordenadores con un buen funcionamiento de la red? No detenga las actividades en su oficina debido a un problema con Internet. ¡Te podemos ayudar! Obtenga más información en nuestro servicio de instalación y mantenimiento de redes.")
    $("#parrafoRedes").toggle(500, function () {
        $("#cuadro1").fadeIn(200);
        $("#cuadro3").fadeIn(200);
        $("#cuadro2").fadeIn(200);
        $('html, body').animate({
            scrollTop: $("#cuadro4").offset().top
        }, 500);
    });
});