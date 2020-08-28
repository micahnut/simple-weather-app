var apiKey ="9712bc9214b14e0aa9d151747202308";
var url = "http://api.weatherapi.com/v1/current.json?key=9712bc9214b14e0aa9d151747202308&q=London";
let city = "";
let name = "";
let phone = "";
let details = "";
let arr =  new Array();
let names = new Array();
let phoneNums = new Array();
let weather = new Array();

function Upload() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                //console.log(rows);
              //  arr.push(rows);
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    arr.push(cells);
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                            // arr.push(cells[j]);
                        }
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            console.log(arr);
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
    alert("Successfully uploaded csv file");
}

function populateTable(weather,names,phoneNums) {

  // Iterate through the list of data
  for(var i = 0; i < weather.length; i++) {
    //console.log(weather[i]);
    $('#tblData tbody').append(createRow(weather[i],names[i],phoneNums[i]));
  }
}

function createRow(weather,name,phoneNum) {
    //var date = new Date(data.date);

  return '' +
    '<tr>' +
      '<td style ="width: 20%;" class="fit">' +
        name  +
      '</td class="fit">' +
      '<td style ="word-break:break-all;" class="fit">' +
        phoneNum  +
      '</td>' +
      '<td style ="word-break:break-all;" class="fit">' +
        weather.location.name  +
      '</td>' +
      '<td style ="word-break:break-all;" class="fit">' +
        weather.current.condition.text +
      '</td>' +
    '</tr>';
}

$(document).ready(
  function(){


  $("#check").click(function(){

    for (var i = 1; i < arr.length; i++) {
        var dataEntry = arr[i];
        //console.log(dataEntry);
        city = dataEntry[6];
        name = dataEntry[2];
        phone = dataEntry[8];
        names.push(name);
        phoneNums.push(phone);
        var date = $("#date_weather").val();
        console.log(date);

        $.ajax({
            url: "http://api.weatherapi.com/v1/current.json?key=9712bc9214b14e0aa9d151747202308&q="+city+"&dt="+date,
            success: function(data, textStatus, jqXHR){
              if(data){

                // console.log(data.current.condition.text);
                // console.log(name);
                weather.push(data);
                //populateTable(data,names,phoneNums);

              }
            },
          error : function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
          }

        });



    }

    alert("Checked results.. click on View Results button to see the results");

  });


    $("#view").click(function(){
       populateTable(weather,names,phoneNums);
    });





});
