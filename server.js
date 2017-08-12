var server = require('express');
var app = server();
var moment = require('moment');
var fs = require('fs');
var path = require('path');

var port = process.env.PORT || 3500;

app.listen(port, function(){
  console.log("[SERVER] Server running at " + port);
});

app.get('/', function(req, res) {
  var fileName = path.join(__dirname,'views', 'index.html');
  res.sendFile(fileName)
});

app.get('/:string', function(req,res) {
  var response;
  if(/^\d{8,}$/.test(req.params.string)) {
    response = moment(req.params.string, "X");
  } else {
    response = moment(req.params.string, "MMMM D, YYYY");
  }

  if(response.isValid()) {
    res.json({ unix: response.format("X"), natural: response.format("MMMM D, YYYY") });
  } else {
    res.json({ unix: null, natural: null });
  }
});