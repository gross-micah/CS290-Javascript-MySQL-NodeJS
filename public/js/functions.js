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
  var req = new XMLHttpRequest();
  req.open("POST", "/update", true);
  req.setRequestHeader("content-type", "application/json;charset=UTF-8");
  req.addEventListener('load', function(){
    if(req.status >= 200 && req.status < 400){
      var response = JSON.parse(req.responseText);
      console.log(response[0]["date"]);
      if (response[0]["lbs"]) document.getElementById("uus").checked = true;
      else if (response[0]["lbs"] == 0) document.getElementById("uuk").checked = true;
      // Get YYYY-MM-dd formatting for input[type=date]
      var date = new Date(response[0]["date"])
      var year = date.getFullYear();
      var m = date.getMonth();
      var month =(m + "").length > 1 ? m : "0" + m;
      var d = date.getDate();
      var day = (d + "").length > 1 ? d : "0" + d;
      var dateValue = "" + year + "-" + month + "-" + day;

      document.getElementById('myModal').style.display = "block";
      document.getElementById('uname').value = response[0]["name"];
      document.getElementById('ureps').value = response[0]["reps"];
      document.getElementById('uweight').value = response[0]["weight"];
      document.getElementById('udate').value = dateValue;
      document.getElementById('uname').value = response[0]["name"];
      event.preventDefault();
      var update = document.getElementById("updateEntry");
      //take values edited from modal and update
      update.addEventListener('click', function(){
        event.preventDefault();
        if (document.getElementById("uus").checked) var bool = "1";
        else if (document.getElementById("uuk").checked) var bool = "0";
        else var bool = NULL;
        var data = {
            "name":document.getElementById("uname").value,
            "reps":document.getElementById("ureps").value,
            "weight":document.getElementById("uweight").value,
            "date": new Date(document.getElementById("udate").value).getTime(),
            "lbs":bool,
            "id":parseInt(response[0]["id"])
        };
        console.log(data);
        if (document.getElementById("uname").value){
          closeModal();
          req.open("POST", "/sendUpdate", true);
          req.setRequestHeader("content-type", "application/json;charset=UTF-8");
          req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
              buildTable();
            }
            else {
              console.log("Error in network request:" + req.statusText);
            }
          });
          req.send(JSON.stringify(data));

        }
        else alert("Name required to add to database.");
      });
    }
    else {
      console.log("Error in network request:" + req.statusText);
    }
  });
  var data = {"id": id};
  console.log(JSON.stringify(data));
  req.send(JSON.stringify(data));
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

function closeModal(){
  document.getElementById('myModal').style.display = "none";
}
