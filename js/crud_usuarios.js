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
        table.clear().draw();
        table.row.add(datos.responseJSON);
        table.columns.adjust().draw();
      },
      error: function (err) {},
    });
  }
  var table = $('#user_table').DataTable({
    dom:'Bfrtip',
    buttons:[
      {
        extend:'excel',
        exportOptions:{
          columns:[0,1,2,3]
        }
      },
      {
        extend:'pdf',
        exportOptions:{
          columns:[0,1,2,3]
        }
      }
    ],
    'columns':[
    {data: 'id_usuario'},
    {data: 'nick'},
    {data: 'nombre'},
    {data: 'correo'},
    {
      data: 'id_usuario',
      orderable:false,
      render: function (data) {
        return `<a class='update btn-warning' data-id='${data}'>modificar </a> -- <a class='delete btn btn-danger' data-id='${data}'>borrar</a> </td>`;
        }
    }
    ],
    bFilter:true,
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
