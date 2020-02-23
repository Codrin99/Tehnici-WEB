const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');

const passport = require('passport');

const User = require('../Node_login/models/User')
const bcrypt = require('bcryptjs');
const app = express();

const { ensureAuthenticated, forwardAuthenticated } = require('./config/auth');

//Passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/keys').MongoURI;

//Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({extended: false}));

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
 
app.get('/', (req,res)=> { res.render('login');});
app.get('/login', (req,res)=> { res.render('login');});

app.get('/', (req,res)=> { res.render('Hamilton');});
app.get('/Hamilton', ensureAuthenticated, (req,res)=> { res.render('Hamilton');});

app.get('/', (req,res)=> { res.render('Home');});
app.get('/Home',ensureAuthenticated, (req,res)=> { res.render('Home');});

app.get('/', (req,res)=> { res.render('Home_log');});
app.get('/Home_log', ensureAuthenticated, (req,res)=> { res.render('Home_log');});

app.get('/', (req,res)=> { res.render('Drivers');});
app.get('/Drivers', ensureAuthenticated, (req,res)=> { res.render('Drivers');});

app.get('/', (req,res)=> { res.render('Drivers_Standings');});
app.get('/Drivers_Standings', ensureAuthenticated, (req,res)=> { res.render('Drivers_Standings');});

app.get('/', (req,res)=> { res.render('Teams_Standings');});
app.get('/Teams_Standings',ensureAuthenticated,  (req,res)=> { res.render('Teams_Standings');});

app.get('/', (req,res)=> { res.render('Teams');});
app.get('/Teams', ensureAuthenticated, (req,res)=> { res.render('Teams');});

app.get('/', (req,res)=> { res.render('Last_race');});
app.get('/Last_race', ensureAuthenticated, (req,res)=> { res.render('Last_race');});

app.get('/', (req,res)=> { res.render('register');});
app.get('/register', (req,res)=> { res.render('register');});

app.use('/static', express.static('Public'));

app.post('/login', (req,res, next) => { 
    
    passport.authenticate('local', {
        successRedirect: '/Home_log',
        failureRedirect: '/login',
        failureFlash: true
      })(req, res, next);
});

app.post('/register', (req, res) => {
    console.log(req.body)

    const{email, pass} = req.body;

    let errors = [];
    //Check required fields
    if(!pass || !email){
        errors.push({msg: 'Please fill  in all fields'});
    }

    
    if(errors.lenght > 0 ){
        res.render('register', {
        errors,
        email,
        pass
        });
    }

    else{
        User.findOne({ email: email})
            .then( user => {
                if(user){
                    errors.push({msg: 'Email is already register'});
                    res.render('register', {
                        errors,
                        email,
                        pass
                        });
                }else{
                    const newUser = new User({
                        email,
                        pass
                    });

                   //Hash password
                   bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.pass, salt, (err, hash) => {
                            if(err) throw err;

                            newUser.pass = hash;
                            //Save user
                            newUser.save()
                                .then(user =>{
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in');
                                    res.redirect('/login');
                                })
                                .catch(err => console.log(err));
                         }))
                }
            });
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});

app.use(function(req, res, next){
    res.status(404).render('404', {title: "Sorry, page not found"});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));