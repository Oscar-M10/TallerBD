$(document).ready(function () {
  cargaTablaUsuarios();

  function cargaTablaUsuarios() {
    $.ajax({
      url: "../controller/usuarios/lista_usuarios.php",
      method: "post",
      dataType: "json",
      contentType: "application/json;charset='utf8'",
      data: {},
      complete: function (datos) {
        console.log(datos.responseJSON);
        $("#usuarios").empty();
        $.each(datos.responseJSON, function (i, v) {
          $("#usuarios").append(
            `<tr>
                        <td>${v.id_usuario}</td>
                        <td>${v.nick}</td>
                        <td>${v.nombre}</td>
                        <td>${v.correo}</td>
                        <td> <a class='seleccionar' data-id='${v.id_usuario}'>seleccionar </a> - - <a class='delete' data-id='${v.id_usuario}' >Borrar</a></td>
                    </tr>`
          );
        });
      },
      error: function (err) {},
    });
  }
  
 
  $(document).on("click", ".delete", function () {
    let id_usuario = $(this).attr("data-id");
    r = confirm(`¿ Borrar al usuario ${id_usuario}? `);
    if (!r) return;
    $.ajax({
      url: "../controller/usuarios/delete_usuario.php",
      type: "post",
      dataType: "json",
      data: { id: id_usuario },
      success: function (r) {
        if (r) {
          cargaTablaUsuarios();
        }
      },
      error: function (err) {
        console.error(err);
      },
    });
  });
  

  $(document).on("click", ".update", function () {
    let id_usuario = $(this).attr("data-id");
    $("#mostrar-modal").trigger("click");
    if (!r) return;
    $.ajax({
    url: "../controller/usuarios/modificar_usuario.php",
    type: "post",
    dataType: "json",
    data: { id: id_usuario },
    success: function (r) {
      if (r) {
        cargaTablaUsuarios();
      }
    },
    error: function (err) {
      console.error(err);
    },
    });
  });
  function seleccionar(id){
    $.getJSON("controller/usuarios/seleccionar_usuarios.php?consultar="+id,function (registros) {
      console.log(registros);
    $('#nick').val(registros[0]['nick']);  
    $('#nombre').val(registros[0]['nombre']);  
    $('#correo').val(registros[0]['correo']);  
    });
  }
  $(buscar());
  function buscar(){
    $.ajax({
      type: "POST",
      url: "../controller/usuarios/modificar_usuario.php",
      data: {consulta: consulta},
      dataType: "html",
      success: function (response) {
        $('#datos').html(response);
      }
    });
  }


});
