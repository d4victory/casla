var partidoGlobal

var id = getParameterByName('partidoid')

$.get('/partido/' + id, function (partido) {
  $.get('/equipo', function (equipos) {
    $.get('/jugador/equipo/' + partido.equipo1, function (jugadores1) {
      $.get('/jugador/equipo/' + partido.equipo2, function (jugadores2) {
        $.get('/division/' + partido.division, function (division) {
          $.get('/cancha/torneo/' + division.torneo, function (canchas) {
            console.log('Entrando en cargarPartido, partido: ' + id)
            partidoGlobal = partido
            var equiposMap = {}
            for (var i = 0; i < equipos.length; i++) {
              equiposMap[equipos[i]._id] = equipos[i].nombre
            }

            $('#team1-id').html('<b>' + equiposMap[partido.equipo1] + '</b>')
            $('#team2-id').html('<b>' + equiposMap[partido.equipo2] + '</b>')
            $('#nro-fecha-id').html(partido.fecha_numero)
            $('#fecha-id').html(formatDate(partido.fecha))

            var options = ['N.E.', 'FIN', 'SUSP', 'POST']
            var aux = ''
            for (var i = 0; i < options.length; i++) {
              if (options[i] == partido.estado) {
                aux += '<option value="' + options[i] + '" selected="selected">' + options[i] + '</option>'
              } else {
                aux += '<option value="' + options[i] + '">' + options[i] + '</option>'
              }
            }
            $('#estado-id').html(aux)

            var auxCanchas = ''
            auxCanchas += '<option value="" selected="selected">' + '-' + '</option>'
            for (var k = 0; k < canchas.length; k++) {
              if (canchas[k]._id == partido.cancha) {
                auxCanchas += '<option value="' + canchas[k]._id + '" selected="selected">' + canchas[k].nombre + '</option>'
              } else {
                auxCanchas += '<option value="' + canchas[k]._id + '">' + canchas[k].nombre + '</option>'
              }
            }

            $('#cancha-id').html(auxCanchas)

            $('#horario-id').val(formatDate2(partido.fecha))

            $('#division-id').html(division.nombre)

            var lista = '<form id="form-jugadoresequipo1-id">'
            for (var i = 0; i < jugadores1.length; i++) {
              lista += jugadores1[i].numero + ' - ' + jugadores1[i].nombre + ' ' + jugadores1[i].apellido + ' ' +'<input type="number" min="0" value="0" style="text-align: center" value="' + jugadores1[i].numero + '">' + '<br>'
            }

            $('#jugadoresEquipo1').html(lista)

            var lista2 = '<form id="form-jugadoresequipo2-id">'
            for (var i = 0; i < jugadores2.length; i++) {
              lista2 += jugadores2[i].numero + ' - ' + jugadores2[i].nombre + ' ' + jugadores2[i].apellido + ' ' +'<input type="number" min="0" value="0" style="text-align: center" value="' + jugadores2[i].numero + '">' + '<br>'
            }

            $('#jugadoresEquipo2').html(lista2)

            // var lista = '<form id="form-amonestados1-id">'
            // for (var i = 0; i < jugadores1.length; i++) {
            //   lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + ' ' + jugadores1[i].nombre + '<br>'
            // }
            //
            // $('#amonestados1-id').html(lista)
            //
            // var lista = '<form id="form-expulsados1-id">'
            // for (var i = 0; i < jugadores1.length; i++) {
            //   lista += '<input type="checkbox" value="' + jugadores1[i].numero + '">' + jugadores1[i].numero + ' - ' + jugadores1[i].apellido + ' ' + jugadores1[i].nombre + '<br>'
            // }
            //
            // $('#expulsados1-id').html(lista)
            //
            // var lista = '<form id="form-amonestados2-id">'
            // for (var i = 0; i < jugadores2.length; i++) {
            //   lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + ' ' + jugadores2[i].nombre + '<br>'
            // }
            //
            // $('#amonestados2-id').html(lista)
            //
            // var lista = '<form id="form-expulsados2-id">'
            // for (var i = 0; i < jugadores2.length; i++) {
            //   lista += '<input type="checkbox" value="' + jugadores2[i].numero + '">' + jugadores2[i].numero + ' - ' + jugadores2[i].apellido + ' ' + jugadores2[i].nombre + '<br>'
            // }
            //
            // $('#expulsados2-id').html(lista)

          })
        })
      })
    })
  })
})

function getParameterByName (name, url) {
  if (!url) {
    url = window.location.href
  }
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

$('#botonGuardarCambios-id').click(function (e) {
  e.preventDefault()
  document.formCargarPartido.action = '/cargarPartido?partidoid=' + id
  $('#formCargarPartido').submit()
})

function formatDate (date) {
  dteSplit = date.split(/[T-]/)
  year = dteSplit[0]
  month = dteSplit[1]
  day = dteSplit[2]
  return day + '/' + month + '/' + year
}

function formatDate2 (fechaS) {
  var date = new Date(fechaS)
  var fecha =
    ('0' + (date.getHours())).slice(-2) + ':' +
    ('0' + (date.getMinutes())).slice(-2)
  return fecha == ('00:00') ? '' : fecha
}