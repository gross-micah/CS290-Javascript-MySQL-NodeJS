function deleteRow(id){
  var req = new XMLHttpRequest();
  req.open("POST", "/delete", true);
  req.setRequestHeader("content-type", "application/json;charset=UTF-8");
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      buildTable();
    }
    else {
      console.log("Error in network request:" + req.statusText);
    }
  });
  var data = {"id": id};
  console.log(JSON.stringify(data));
  req.send(JSON.stringify(data));
};

function updateRow(id){
  console.log("Update " + id);
};

function buildTable(){
  document.getElementById("theTable").innerHTML = "";
  var req = new XMLHttpRequest();
  req.open("GET", "/log", true);
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      var keys = Object.keys(response[0]);
      var table = document.createElement("table");
      table.setAttribute("id", "myTable");
      var tablebody = document.createElement("tbody");
      tablebody.setAttribute("id", "tbody");
      //create table header
      var header = table.createTHead();
      header.setAttribute("id", "TH");
      table.appendChild(header);
      var row = header.insertRow(0);
      for (var i = 0; i < keys.length; i++){
        var cell = document.createElement("td");
        var cellText = document.createTextNode('' + keys[i]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      header.appendChild(row);
      //create table body
      for (var i = 0; i < response.length; i++){
        var row = document.createElement("tr");
        for (var value in response[i]){
          var cell = document.createElement("td");
    	    var cellText = document.createTextNode(response[i][value]);
    		  cell.appendChild(cellText);
  		    row.appendChild(cell);
        }
        var cell = document.createElement("td");
        var button = document.createElement("input");
        button.type = "button";
        button.value = "delete";
        button.setAttribute("ID", "D" + response[i].id);
        button.onclick = function() {
          deleteRow(this.id);
        };
        cell.appendChild(button);
        row.appendChild(cell);
        var cell2 = document.createElement("td");
        var button2 = document.createElement("input");
        button2.type = "button";
        button2.value = "update";
        button2.setAttribute("ID", "U" + response[i].id);
        button2.onclick = function(evt) {
          updateRow(this.id);
        };
        cell2.appendChild(button2);
        row.appendChild(cell2);
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
};

function validate(){
  if (document.getElementById("fname").value) insert();
  else alert("Name required to add to database.");
};

function insert(){
  var req = new XMLHttpRequest();
  var form = document.forms[0];
  if (document.getElementById("fus").checked) var bool = "1";
  else var bool = "0";
  var data = {
      "name":document.getElementById("fname").value,
      "reps":document.getElementById("freps").value,
      "weight":document.getElementById("fweight").value,
      "date":document.getElementById("fdate").value,
      "lbs":bool
  };
  req.open("POST", "/insert", true);
  req.setRequestHeader("content-type", "application/json;charset=UTF-8");
  req.addEventListener('load', function(){
    console.log("listener worked");
    if(req.status >= 200 && req.status < 400){
      buildTable();
    }
    else {
      console.log("Error in network request:" + req.statusText);
    }
  });
  req.send(JSON.stringify(data));
  console.log("it at least tried");
  event.preventDefault();
};
