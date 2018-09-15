const express = require("express");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');

const app = express();
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

// Method override middleware
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
app.use(flash());
app.use(function(req, res, next){

    console.log(Date.now());
    req.name = "jwon good"
    next();

});

//Global variables
app.use(function(req, res, next){
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

app.get('/ideas', (req, res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas=>{
        res.render('ideas/index',{
            ideas:ideas
        });
    });
});

//add form
app.get('/ideas/add', (req, res)=>{
    res.render('ideas/add');
});

//edit form
app.get('/ideas/edit/:id', (req, res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('ideas/edit', {
            idea:idea
        });
    })
});

app.post('/ideas', (req, res)=>{
    let errors = [];
    if(!req.body.title){
        errors.push({text:'Please add a title'});
    }
    if(!req.body.details){
        errors.push({text: 'Plasses add a details'})
    }

    if(errors.length > 0){
        res.render(
            'ideas/add' , {
                errors: errors,
                title: req.body.title,
                details: req.body.details
            }
        );
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            
            .then(idea => {
                req.flash('success_msg','Video idea added');
                res.redirect('/ideas');
        })
    }
});

//Edit Form Process
app.put('/ideas/:id', (req, res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea=>{
        idea.title = req.body.title
        idea.details = req.body.details;
        idea.save()
            .then(idea=>{
                req.flash('success_msg','Video idea updated');
                res.redirect('/ideas');
        })
    })
});

app.delete('/ideas/:id', (req, res)=>{
    Idea.remove({_id:req.params.id})
    .then(()=>{
        req.flash('success_msg','Video idea removed');
        res.redirect('/ideas');
    })
});


app.listen(port, function(){
    console.log(`Server started on port ${port}`);
});
