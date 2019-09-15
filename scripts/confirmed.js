$(window).on("load", function() {
  getConfirmed();
});

function getConfirmed() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let db = JSON.parse(this.responseText);

      let html = '<div class="table-responsive-md"><table class="table">';
      html += `<thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>
                    </tr>
                </thead>`

      // Loop through array and add table cells
      for (var i = 0; i < db.length; i++) {
        let item = db[i];
        let statusColumn = "";


        if(item.status == "confirmed") {
            html += "<tr class=\"table-success\">";
            statusColumn = "<td>Confirmado</td>";
        }
        else {
            html += "<tr>";
            statusColumn = "<td>Pendiente</td>";
        }

        html += "<td>" + (i+1) + "</td>";
        html += "<td>" + item.name + "</td>";

        html += statusColumn;
        html += "</tr><tr>";
      }
      html += "</tr></table></div>";

      // ATTACH HTML TO CONTAINER
      document.querySelector(".table-container").innerHTML = html;
    }
  };
  xmlhttp.open(
    "GET",
    "https://jsonblob.com/api/8c48abb9-d77c-11e9-93e2-6f9a6af437fd",
    true
  );
  xmlhttp.send();
}
