function doThis(){
  var req = new XMLHttpRequest();
  var payload = {};
  req.open("GET", "/log", true);
  req.addEventListener('load', function(){
    console.log("listener worked");
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      //console.log(response[0]);
      //console.log(response[1]);
      //var length = Object.keys(response).length;
      var keys = Object.keys(response[0]);
      console.log("Keys: " + keys);
      console.log(keys.length);
      console.log(keys[0]);
      console.log(response[0].id);
      console.log(response.length);
      console.log(response[0].name);
      var table = document.createElement("table");
      table.setAttribute("id", "myTable");
      var tablebody = document.createElement("tbody");
      //create table header
      var header = table.createTHead();
      header.setAttribute("id", "TH");
      table.appendChild(header);
      var row = header.insertRow(0);
      for (var i = 1; i < keys.length; i++){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('' + keys[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      header.appendChild(row);
      //create table body
      /*for (var i = 0; i < response.length; i++){
        var row = document.createElement("tr");
        for (var j = 1; j< keys.length; j++){
  		      var cell = document.createElement("td");
  		      cell.style.border = "2px";
  		      var cellText = document.createTextNode(response[i]);
    		    cell.appendChild(cellText);
  		    row.appendChild(cell);
        }*/
        for (var i = 0; i < response.length; i++){
          var row = document.createElement("tr");
          for (var value in response[i]){
            if (response[i][value] != "id")
            {
              console.log(response[i][value]);
    		      var cell = document.createElement("td");
    		      cell.style.border = "2px";
    		      var cellText = document.createTextNode(response[i][value]);
      		    cell.appendChild(cellText);
    		      row.appendChild(cell);
            }
          }

      tablebody.appendChild(row);
      }
      table.appendChild(tablebody);
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

function insert(){

};
