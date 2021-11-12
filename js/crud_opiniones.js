$(document).ready(function () {
    cargaTablaOpiniones();
  
    function cargaTablaOpiniones() {
      $.ajax({
        url: "../controller/usuarios/lista_opiniones.php",
        method: "post",
        dataType: "json",
        contentType: "application/json;charset='utf8'",
        data: {},
        complete: function (datos) {
          console.log(datos.responseJSON);
          $("#opiniones").empty();
          $.each(datos.responseJSON, function (i, v) {
            $("#opiones").append(
              `<tr>
                          <td>${v.id}</td>
                          <td>${v.id_temporada}</td>
                          <td>${v.nick}</td>
                          <td>${v.episodio}</td>
                          <td>${v.opinion}</td>          
                </tr>`
            );
          });
        },
        error: function (err) {},
      });
    }
});