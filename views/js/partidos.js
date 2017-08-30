var partidoGlobal;

$("#dataPartidosConFecha").hide();


$(document).on("click", ".deletePartido", function (e) {
    e.preventDefault();
    var id = $(this).attr("id");
    var partidoId = id.split("-")[0];
    var team1 = id.split("-")[1];
    var team2 = id.split("-")[2];
    if (confirm("Seguro que desea eliminar al partido " + team1 + " VS " + team2 + "?")) {
        $("#formDelete" + partidoId).submit();
    }
});

$(document).on("click", ".cargarPartido", function (e) {
    e.preventDefault();
    var id = $(this).attr("id");
    $.get({url:'/partido/' + id}, function (partido){
        $.get({url:'/equipo'}, function (equipos) {
            $.get({url:'/jugador/equipo/'+partido.equipo1}, function (jugadores1) {
                $.get({url:'/jugador/equipo/'+partido.equipo2}, function (jugadores2) {
                    $.get({url:'/division/'+partido.division}, function (division) {

                        console.log('Entrando en cargarPartido, partido: '+id);
                        partidoGlobal = partido;
                        var equiposMap = {};
                        for (var i = 0; i < equipos.length; i++) {
                            equiposMap[equipos[i]._id] = equipos[i].nombre;
                        };

                        $('#myModal').modal();
                        $('#teams-header-id').html(equiposMap[partido.equipo1]+' vs '+equiposMap[partido.equipo2]);
                        $('#team1-id').html('<b>'+equiposMap[partido.equipo1]+'</b>');
                        $('#team2-id').html('<b>'+equiposMap[partido.equipo2]+'</b>');
                        $('#nro-fecha-id').html(partido.fecha_numero);
                        $('#fecha-id').val(formatDate2(partido.fecha));

                        var options = ['N.E.','FIN','SUSP','POST'];
                        var aux = "";
                        for(var i=0; i<options.length;i++){
                            if(options[i] == partido.estado){
                                aux+='<option value="'+options[i]+'" selected="selected">'+options[i]+'</option>';
                            }else{
                                aux+='<option value="'+options[i]+'">'+options[i]+'</option>';
                            }
                        }
                        $('#estado-id').html(aux);

                        $('#division-id').html(division.nombre);

                        var lista = '<form id="form-amonestados1-id">';
                        for (var i = 0; i < jugadores1.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + '<br>';
                        };
                        $('#amonestados1-id').html(lista);

                        var lista = '<form id="form-expulsados1-id">';
                        for (var i = 0; i < jugadores1.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + '<br>';
                        };
                        $('#expulsados1-id').html(lista);

                        var lista = '<form id="form-amonestados2-id">';
                        for (var i = 0; i < jugadores2.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + '<br>';
                        };
                        $('#amonestados2-id').html(lista);

                        var lista = '<form id="form-expulsados2-id">';
                        for (var i = 0; i < jugadores2.length; i++) {
                            lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + '<br>';
                        };
                        $('#expulsados2-id').html(lista);

                    });
                });
            });
        });
    });
});

// $(document).on("click", '.botonGuardarCambios-id', function(e){
// 	//console.log("guardarCambios fue presionado");
// 	var id = $(this).attr("id");
// 	//var id = $('#botonGuardarCambios-id').attr("name");
// 	var data = partidoGlobal;
// 	data.fecha = new Date($('#fecha-id').val());
// 	data.estado = $('#estado-id').val();
// 	console.log(data);
// });

$("#divisionSelect").change(function(){
    $("#fechaSelect").empty()
    $("#dataPartidosConFecha").hide();
    $("#dataPartidosConFecha").empty();
    var divisionId = $("#divisionSelect").val();
    $.get('partido/fechas/division/'+divisionId, function(fechas) {
        if ( fechas.length == 0 ){
            alert('No hay partidos para la división seleccionada')
        } else {
            for (var i = 0; i < fechas.length; i++) {
                $("#fechaSelect").append('<option value="none"></option>');
                $("#fechaSelect").append('<option value='+fechas[i]+'>'+fechas[i]+'</option>');
            };
        }
    });
});

$("#fechaSelect").change(function () {
    if ($("#fechaSelect").val() == "none") {
        $("#dataPartidosConFecha").hide();
        $("#dataPartidosConFecha").empty();
    } else {
        $("#dataPartidosConFecha").show();
        $("#dataPartidosConFecha").css("visibility", "visible");
        $("#dataPartidosConFecha").empty();

        var fecha_numero = $("#fechaSelect").val();
        $.get('/partido/fecha_numero/' + fecha_numero, function (partidos) {
            $.get('/equipo', function (equipos) {
                $.get('/division', function (divisiones) {
                    $.get('/cancha', function (cancha) {
                        var equiposMap = {};
                        for (var i = 0; i < equipos.length; i++) {
                            equiposMap[equipos[i]._id] = equipos[i].nombre;
                        }
                        ;
                        var divisionesMap = {};
                        for (var i = 0; i < divisiones.length; i++) {
                            divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                        }
                        ;

                        var canchaMap = {};
                        for (var i = 0; i < cancha.length; i++) {
                            canchaMap[cancha[i]._id] = cancha[i].nombre;
                        }
                        ;

                        var html = "";
                        //var htmlAdmin = "";
                        for (var i = 0; i < partidos.length; i++) {

                            html += '<tr><td class="headline06">' + partidos[i].estado + '</td>';
                            html += '<td class="headline06">' + equiposMap[partidos[i].equipo1] + '</td>';
                            html += '<td class="headline06">';
                            if (partidos[i].marcador_equipo_1 == undefined) {
                                html += "X";
                            } else {
                                html += partidos[i].marcador_equipo_1;
                            }
                            html += "</td>";
                            html += '<td class="headline06">';
                            if (partidos[i].marcador_equipo_2 == undefined) {
                                html += "X";
                            } else {
                                html += partidos[i].marcador_equipo_2;
                            }
                            html += "</td>";
                            html += '<td class="headline06">' + equiposMap[partidos[i].equipo2] + '</td>';

                            html += '<td class="headline06">' + formatDate(partidos[i].fecha) + '</td>';
                            html += '<td class="headline06">' + formatDate2(partidos[i].fecha) + '</td>';
                            html += '<td class="headline06">' + divisionesMap[partidos[i].division] + '</td>';
                            html += '<td class="headline06">' + canchaMap[partidos[i].cancha] + '</td>';

                            // html += '<td class="headline06">';
                            // if (partidos[i].amonestados.length == 0) {
                            //     html += 'Ninguno';
                            // } else {
                            //     html += "VER AMONESTADOS";
                            // }
                            // html += '</td>';
                            //
                            // html += '<td class="headline06">';
                            // if (partidos[i].expulsados.length == 0) {
                            //     html += 'Ninguno';
                            // } else {
                            //     html += "VER EXPULSADOS";
                            // }
                            // html += '</td>';
                            //
                            // html += '<td class="headline06">';
                            // if (partidos[i].goles.length == 0) {
                            //     html += 'Ninguno';
                            // } else {
                            //     html += "VER GOLES";
                            // }
                            html += '</td>';

                            //html += '<td class="headline06">';
                            //if (partidos[i].cambios.length == 0) {
                            //	html += 'Ninguno';
                            //} else {
                            //	html += "VER CAMBIOS";
                            //}
                            //html += '</td>';


                            html += '<td class="headline06b"><span>' +
                                '<form action="/cargarPartido">' +
                                '<input type="hidden" name="partidoid" value="' + partidos[i]._id + '" />' +
                                '<button type="submit">Cargar</button>' +
                                '</form></span></td>';

                            //html += ' <% if (users[i].role == "ADMIN") { %>';
                            // htmlAdmin +=

                            html += '<td class="headline06b"><span>' +
                                '<form action="/deletePartido" method="post" id="formDelete' + partidos[i]._id + '">' +
                                '<button class="deletePartido" id="' + partidos[i]._id + '-' + equiposMap[partidos[i].equipo1] + '-' + equiposMap[partidos[i].equipo2] + '" type="submit">Eliminar</button>' +
                                '<input type="hidden" value=' + partidos[i]._id + ' name="partidoid"/>' +
                                '</form></span></td>';

                            //html += '<% } %>';
                            html += '</tr>';
                        }
                        $("#dataPartidosConFecha").append(html);

                    });
                });
            });
        });
    }
});

$("#fechaSelect1").change(function () {
    if ($("#fechaSelect1").val() == "none") {
        $("#dataPartidosConFecha").hide();
        $("#dataPartidosConFecha").empty();
    } else {
        $("#dataPartidosConFecha").show();
        $("#dataPartidosConFecha").css("visibility", "visible");
        $("#dataPartidosConFecha").empty();

        var fecha_numero = $("#fechaSelect1").val();
        $.get({url:'/partido/fecha_numero/' + fecha_numero}, function (partidos) {
            $.get({url:'/equipo'}, function (equipos) {
                $.get({url:'/division'}, function (divisiones) {
                    $.get({url:'/cancha'}, function (cancha) {

                        var equiposMap = {};
                        for (var i = 0; i < equipos.length; i++) {
                            equiposMap[equipos[i]._id] = equipos[i].nombre;
                        }
                        ;
                        var divisionesMap = {};
                        for (var i = 0; i < divisiones.length; i++) {
                            divisionesMap[divisiones[i]._id] = divisiones[i].nombre;
                        }
                        ;

                        var canchaMap = {};
                        for (var i = 0; i < cancha.length; i++) {
                            canchaMap[cancha[i]._id] = cancha[i].nombre;
                        }
                        ;

                        var html = "";
                        for (var i = 0; i < partidos.length; i++) {

                            html += '<tr><td class="headline06">' + partidos[i].estado + '</td>';
                            html += '<td class="headline06">' + equiposMap[partidos[i].equipo1] + '</td>';
                            html += '<td class="headline06">';
                            if (partidos[i].marcador_equipo_1 == undefined) {
                                html += "X";
                            } else {
                                html += partidos[i].marcador_equipo_1;
                            }
                            html += "</td>";
                            html += '<td class="headline06">';
                            if (partidos[i].marcador_equipo_2 == undefined) {
                                html += "X";
                            } else {
                                html += partidos[i].marcador_equipo_2;
                            }
                            html += "</td>";
                            html += '<td class="headline06">' + equiposMap[partidos[i].equipo2] + '</td>';

                            if (partidos[i].fecha == undefined){

                                html += '<td></td><td></td>';

                            } else {

                                html += '<td class="headline06">' + formatDate(partidos[i].fecha) + '</td>';
                                html += '<td class="headline06">' + formatDate2(partidos[i].fecha) + '</td>';

                            }

                            html += '<td class="headline06">' + divisionesMap[partidos[i].division] + '</td>';
                            html += '<td class="headline06">';
                            if (canchaMap[partidos[i].cancha] == undefined) {

                                html += 'S/Def';

                            } else {

                                html  +=  canchaMap[partidos[i].cancha];

                            }

                            html += "</td>";


                            html += '<td class="headline06">';
                            if (partidos[i].amonestados.length == 0) {
                                html += 'Ninguno';
                            } else {
                                html += "VER AMONESTADOS";
                            }
                            html += '</td>';

                            html += '<td class="headline06">';
                            if (partidos[i].expulsados.length == 0) {
                                html += 'Ninguno';
                            } else {
                                html += "VER EXPULSADOS";
                            }
                            html += '</td>';

                            html += '<td class="headline06">';
                            if (partidos[i].goles.length == 0) {
                                html += 'Ninguno';
                            } else {
                                html += "VER GOLES";
                            }
                            html += '</td>';

//                        html += '<td class="headline06">';
//                        if (partidos[i].cambios.length == 0) {
//                            html += 'Ninguno';
//                        } else {
//                            html += "VER CAMBIOS";
//                        }
//                        html += '</td>';


                            html += '<td class="headline06b"><span>' +
                                '<form action="/cargarPartido">' +
                                '<input type="hidden" name="partidoid" value="' + partidos[i]._id + '" />' +
                                '<button type="submit">Cargar</button>' +
                                '</form></span></td>';


                            html += '</tr>';
                        }
                        $("#dataPartidosConFecha").append(html);

                    });
                });
            });
        });
    }
});


function formatDate(date) {
    dteSplit = date.split(/[T-]/);
    year = dteSplit[0];
    month = dteSplit[1];
    day = dteSplit[2];
    return day + "/" + month + "/" + year;
}

function formatDate2(fechaS) {
    var date = new Date(fechaS);
    var fecha =
        ('0' + (date.getHours())).slice(-2) + ":" +
        ('0' + (date.getMinutes())).slice(-2);

    return fecha == ("00:00") ? "-" : fecha;

}
