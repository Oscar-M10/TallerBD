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
                        <td> <a class='update' data-id='${v.id_usuario}'> modificar </a> - - <a class='delete' data-id='${v.id_usuario}' >Borrar</a>   </td>
                    </tr>`
          );
        });
      },
      error: function (err) {},
    });
  }

  $(document).on("click", "#btn_guarda_usuario", function () {
    //TODO: Aqui debes validar el formulario... ( tipos de datos, que todo este lleno etc.)
    $.ajax({
      url: "../controller/usuarios/nuevo_usuario.php",
      type: "post",
      dataType: "json",
      data: $("#form").serialize(),
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
  $(document).on("click", ".modificar", function () {
    let id_usuario = $(this).attr("data-id");
    r = confirm(`¿ Modificar el usuario ${id_usuario}? `);
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
});
