$("#roleSelect").change(function(){
	if($("#roleSelect").val()=="ADMIN")
		$('#formRegistro').attr('action', '/signupadmin');
	else {
		if($("#roleSelect").val()=="PLANILLERO")
			$('#formRegistro').attr('action', '/signupplanillero');
		else
			$('#formRegistro').attr('action', '/signup');
	}
});

$("#buscadorUsuario").keyup(function(){
	$("#datosUsers").empty();
	var username = $("#buscadorUsuario").val();
	if(username){
		$.get({url:'/user/username/'+username}, function(users) {
			$.get({url:'/equipo'}, function(equipos) {
				showUsers(users,equipos);
			});
		});
	} else {
		$.get({url:'/user/notAdmins'}, function(users) {
			$.get({url:'/equipo'}, function(equipos) {
				showUsers(users,equipos);
			});
		});
	}
	

});

$(document).on( "click", ".deleteUser", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	if (confirm("Seguro que desea eliminar al usuario?")) {
        $("#"+id).submit();
    }
});

$(document).on( "click", ".asignarEquipo", function(e){
	e.preventDefault();
	var id = $(this).attr("id");
	var mail = id.split("-")[1];
	var userid = id.split("-")[2];

	if (confirm("Seeguro que desea cambiar el equipo del delegado "+mail+"?")) {
        $("#formDelegar"+userid).submit();
    }
});


function showUsers(users, equipos){
			var equiposMap =  {};
            for (var i = 0; i < equipos.length; i++) {
                equiposMap[equipos[i]._id] = equipos[i].nombre;
            };
            var equiposSinDelegado =  {};
            for (var i = 0; i < equipos.length; i++) {
            	if (equipos[i].delegado == undefined){
                	equiposSinDelegado[equipos[i]._id] = true;
				} else {
                	equiposSinDelegado[equipos[i]._id] = false;
				}
            };

			var html = "";
			for (var i = 0; i < users.length; i++) {
				html +=
					'<tr>'+
	                   '<td class="headline01">'+users[i].email+'</td>'+
	                   '<td class="headline01">'+users[i].role+'</td>'+
	                   '<td class="headline01">';

	            if (users[i].role != "DELEGADO") {
	            	html += "No disponible";
	            } else {
	            	if(users[i].equipo){
	            		html += equiposMap[users[i].equipo];
	            	} else {
	            		html += 'Ninguno';
	            	}

                    html += '<form action="/delegarEquipo" method="post" id="formDelegar'+users[i]._id+'">'
		            	html += '<select name="equipo" id="equipo">';
		            	html += '<option value="none">Ninguno</option>';
		            	for (var j = 0; j < equipos.length; j++) {
		            		if (equiposSinDelegado[equipos[j]._id]) {
                                  html+='<option value="'+equipos[j]._id+'">'+equipos[j].nombre+'</option>';
                            }
		            	};
		            	html += '</select>';
                    	html += '<input type="hidden" value='+users[i]._id+' name="userid"/>';
	            	html += '<button type="submit" class="asignarEquipo" id="boton-'+users[i].email+'-'+users[i]._id+'">Asignar</button></form>'
	            }
	            html += '</td>';

	            html += '<td class="headline01">';
	            if (users[i].role == "ADMIN") {
	            	html += "No disponible";
	            } else {
	            	html += '<form class="deleteUser" id="'+users[i]._id+'" action="/deleteUser" method="post">'+
	                		  	'<button type="submit" id='+users[i]._id+'>Eliminar</button>'+
	                			'<input type="hidden" value='+users[i]._id+' name="userid"/></form>';
	            }
	            html += '</td>';
			};
			$("#datosUsers").append(html);
}
