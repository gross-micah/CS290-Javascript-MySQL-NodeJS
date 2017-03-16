function doThis(){
  var req = new XMLHttpRequest();
  var payload = {};
  req.open("GET", "/log", true);
  req.addEventListener('load', function(){
    console.log("listener worked");
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response[0]);
      console.log(response[1]);
      //var length = Object.keys(response).length;
      var keys = Object.keys(response);
      console.log("Keys: " + keys);
      var table = document.createElement("table");
      table.setAttribute("id", "myTable");
      var tablebody = document.createElement("tbody");
      //create table header
      var header = table.createTHead();
      header.setAttribute("id", "TH");
      table.appendChild(header);
      var row = header.insertRow(0);
      for (var value in keys){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('' + value);
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
  });
  req.send(null);
  console.log("it at least tried");
};
