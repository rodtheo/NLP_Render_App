var el = x => document.getElementById(x);

function showPicker() {
  el("file-input").click();
}

function showPicked(input) {
  el("upload-label").innerHTML = input.files[0].name;
  var reader = new FileReader();
  reader.onload = function(e) {
    el("image-picked").src = e.target.result;
    el("image-picked").className = "";
  };
  reader.readAsDataURL(input.files[0]);
}

function analyze() {
  var uploadFiles = el("content-upload").value;
  var response; 
  el("analyze-button").innerHTML = "Analyzing...";
  var xhr = new XMLHttpRequest();
  var loc = window.location;
  xhr.open("POST", `${loc.protocol}//${loc.hostname}:${loc.port}/analyze`,
    true);
  xhr.onerror = function() {
    alert(xhr.responseText);
  };
  xhr.onload = function(e) {
    if (this.readyState === 4) {
      response = JSON.parse(e.target.responseText);
      var resp_emoticon;
      if (response["result"] == "False"){
	      resp_emoticon = 128515
      } else {
	      resp_emoticon = 128532
      }
      el("result-label").innerHTML = `&#${resp_emoticon}`;
// happy - 128515
	    // sad - 128532
      document.getElementById('container').innerHTML = "";
      var data = response["data"];
        // set the data
      console.log(data);
        // create the chart
      var chart = anychart.column();

        // add the data
      	chart.data(data);

        // set the chart title
       //chart.title("Does it have depressive content? What're the odds ?");
	
	chart.yScale().ticks().interval(10);
	chart.yScale().minorTicks().interval(2);

//	chart.yAxis().minorTicks().enabled(True);

        // draw
       chart.container("container");
       chart.draw();
    }
    el("analyze-button").innerHTML = "Analyze";
  };

  var fileData = new FormData();
  fileData.append("file", uploadFiles);
  xhr.send(fileData);

/* anychart.onDocumentReady(function() {
	 el('container').innerHTML = "";
 	var data = {
            header: ["Name", "Probability"],
	    rows:[ 
		["stats_false", 0],
		["stats_true",0  ]
	    ]};
	// var data = response['data'];
        // set the data
        console.log(data);
        // create the chart
        var chart = anychart.bar();

        // add the data
        chart.data(data);

        // set the chart title
        chart.title("The deadliest earthquakes in the XXth century");

        // draw
        chart.container("container");
        chart.draw();
    });*/
  
}

