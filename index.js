var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.status(301).redirect("index.html")
})

app.get("/users", function (req, res) {

    var fs = require('fs');
    var users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    var filtered_users = [];

    users.forEach(function(user){
        if( user['username'].toLowerCase().indexOf( req.query.username.toLowerCase() ) == 0 ){
            filtered_users.push( user );
          }
    });

    res.setHeader('Content-Type', 'application/json');
    res.json( filtered_users );
})

app.listen(3000)
