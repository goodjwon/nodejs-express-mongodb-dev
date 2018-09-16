const express = require("express");
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
const ideas = require('./routes/ideas');
const users = require('./routes/users');


const port = 5000;

mongoose.connect('mongodb://localhost/goodjwon',{
})
    .then(()=>console.log("MongoDB Connected..."))
    .catch(err=>console.log(err));


require('./models/Idea');
const Idea = mongoose.model('ideas');


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());

//Global variables
app.use(function(req, res, next){
    console.log(Date.now());
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

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
});

// Use routes
app.use('/ideas', ideas);
app.use('/users', users);

// Run server
app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});
