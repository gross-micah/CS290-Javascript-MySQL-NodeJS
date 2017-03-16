function doThis(){
  var req = new XMLHttpRequest();
  var payload = {};
  req.open("GET", "/log", true);
  req.onreadystatechange = function(){
    console.log("listener worked");
    if(req.status >= 200 && req.status < 400){
      var response = req.responseText;
      //var length = Object.keys(response).length;
      var keys = Object.keys(response);
      var table = document.createElement("table");
      table.setAttribute("id", "myTable");
      var tablebody = document.createElement("tbody");
      //create table header
      var header = table.createTHead();
      header.setAttribute("id", "TH");
      table.appendChild(header);
      var row = header.insertRow(0);
      for (var key in response){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('' + key);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      header.appendChild(row);
      //create table body


      var insert = document.getElementById('theTable');
      insert.appendChild(table);
    }
    else {
      console.log("Error in network request:" + req.statusText);
    }
  }
  req.send(null);
  console.log("it at least tried");
};
