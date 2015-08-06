var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));
var port = 8880;

app.listen(port);
console.log("Server has been started on localhost:"+port+" port")