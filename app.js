const express = require("express");

const app = express();

app.use(function(req, res, next){
   console.log(Date.now());
   req.name = 'Jwon Goods';
   next();
});

app.get('/', function(req, res){
    console.log(req.name);
    res.send('INDX');
});

app.get('/about', function(req, res){
    res.send('ABOUT');
});

const port = 5000;

app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});
