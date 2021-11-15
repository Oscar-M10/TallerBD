$(document).ready(function(){

    var table = $('#user_table').DataTable({
        language: {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast":"Último",
                "sNext":"Siguiente",
                "sPrevious": "Anterior"
             },
             "sProcessing":"Procesando...",
        },
        responsive:true,
        dom: 'Bfrtilp',
        buttons: [
            {
				extend:    'excelHtml5',
				text:      '<i class="fas fa-file-excel"></i> ',
				titleAttr: 'Exportar a Excel',
				className: 'btn btn-success'
			},
			{
				extend:    'pdfHtml5',
				text:      '<i class="fas fa-file-pdf"></i> ',
				titleAttr: 'Exportar a PDF',
				className: 'btn btn-danger'
			},

        ],
        'columns': [
             
            {data: 'id_usuario'},
            {data: 'nick'},
            {data: 'nombre'},
            {data: 'correo'},
            {
                data:'id_usuario',
                orderable:false,
                render:function(data){
                    return ` <a class='update btn btn-warning' data-id='${data}'> modificar </a> - - <a class='delete btn btn-danger' data-id='${data}' >Borrar</a>   </td>`;
                }
            }
           
        ],
        bFilter: true,
    });


    cargaTablaUsuarios();

    function cargaTablaUsuarios(){
        $.ajax({
            url: "../controller/usuarios/lista_usuarios.php",
            method:"post",
            dataType: "json",
            contentType:"application/json;charset='utf8'",
            data:{},
            complete: function(datos) {
                table.clear().draw();
                table.rows.add(datos.responseJSON);
                table.columns.adjust().draw();
            },
            error:function(err){
            
            }
        });
    }

    $(document).on('click','#btn_guarda_usuario',function(){
        //TODO: Aqui debes validar el formulario... ( tipos de datos, que todo este lleno etc.)
        $.ajax({
            url: "../controller/usuarios/nuevo_usuario.php",
            type:"post",
            dataType: "json",
            data: $("#form").serialize(),
            success: function(r) {
                if(r){
                    cargaTablaUsuarios();
                }else{
                    alert("Error en el sistema");
                    clearForm();
                }
            },
            error:function(err){
                console.error(err);
            }
        });
    }); 
    $(document).on('click','.delete',function(){
        let id_usuario = $(this).attr("data-id");
        r = confirm(`¿ Borrar al usuario ${id_usuario}? `);
        if(!r) return;
        $.ajax({
            url: "../controller/usuarios/delete_usuario.php",
            type:"post",
            dataType: "json",
            data: {id:id_usuario},
            success: function(r) {
               if(r){
                   cargaTablaUsuarios();
               }
            },
            error:function(err){
                console.error(err);
            }
        });
    });

    function clearForm(){
        $("#btn_limpiar").trigger("click");
    }
    $(document).on('click','.update',function(){
        let id_usuario = $(this).attr("data-id");
        
        $.getJSON("../conexion/conexion.php?consultar=" + id_usuario, function (registros) {
            console.log(registros);
            $("#nick").val(registros[0]["nick"]);
            $("#nombre").val(registros[0]["nombre"]);
            $("#correo").val(registros[0]["correo"]);
        
        });
    });
    function editar() {
        var datos = new FormData();
        datos.append("nick", $("#nick").val());
        datos.append("nombre", $("#nombre").val());
        datos.append("correo", $("#correo").val());

        $.ajax({
          type: "post",
          url: "../conexion/conexion.php?actualizar=1",
          data: datos,
          processData: false,
          contentType: false,
          success: function (respuesta) {
            console.log(respuesta);
            cargaTablaUsuarios();
          },
        });
	}

});