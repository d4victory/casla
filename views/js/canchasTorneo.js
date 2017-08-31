$(document).on( "click", ".deleteCancha", function(e){
    e.preventDefault();
    var id = $(this).attr("id");
    var divisionid = id.split("-")[0];
    var nombre = id.split("-")[1];
    if (confirm("Seguro que desea eliminar la division "+nombre+"?")) {
        $("#formDelete"+divisionid).submit();
    }
});

$("#canchaSelect").change(function(){
    if($("#canchaSelect").val()=="none"){
        $("#dataCancha").hide();
        $("#dataCancha").empty();
    } else {
        $("#dataCancha").show();
        $("#dataCancha").css("visibility","visible");
        $("#dataCancha").empty();

        var canchaId = $("#canchaSelect").val();
        $.get({url:'/cancha/'+canchaId}, function(cancha) {
            var html = "";
            html += '<li class="clearfix">';
            html += '<div class="subPoint_table">';
            html += '<div class="headline01 smallpoint">'+cancha.nombre+'</div>';
            html += '<div class="headline01 smallpoint">';
            html += '</div>';

            // html += '<div class="headline01 smallpoint1">'+
            // 	  				'<form action="/deleteDivision" method="post" id="formDelete'+divisionid+'">'+
            // 	  					'<button class="deleteDivision" id="'+divisionid+'-'+division.nombre+'" type="submit">Eliminar</button>'+
            // 	  					'<input type="hidden" value='+ divisionid +' name="divisionid"/>'+
            // 	  				'</form></div></div></div></li>';
            $("#dataCancha").append(html);

        });
    }
});

function confirmation() {
    return confirm('Seguro que desea eliminar la cancha')
}

function canchaDelete(id) {
    $.get('/partido/cancha/'+id, function(partidos) {
        if (partidos.length>0){
            alert("Oops, hay partidos ultilizando está cancha, es imposible eliminarla");
            return false;
        } else {
            if(confirmation()){
                var form = $('<form></form>');

                form.attr("method", "post");
                form.attr("action", '/deleteCancha');


                var field = $('<input></input>');

                field.attr("type", "hidden");
                field.attr("name", 'canchaid');
                field.attr("value", id);

                form.append(field);


                // The form needs to be a part of the document in
                // order for us to be able to submit it.
                $(document.body).append(form);
                form.submit();
            } else {
                return false;
            }
        }
    });
}