const express = require("express");
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/goodjwon',{
})
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));


require('./models/Idea');
const Idea = mongoose.model('ideas');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const port = 5000;

app.use(function(req, res, next){

    console.log(Date.now());
    req.name = "jwon good"
    next();

});

//index Rout
app.get('/', (req, res)=>{
    console.log(req.name);
    const title = 'Welcome1';
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res)=>{
    res.render('about');
})


app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});
