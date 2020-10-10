const express=require('express');
let app=express();
const path=require('path');
const nunjucks=require("nunjucks");
const session = require('express-session');
const bp=require('body-parser');


app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));

app.use(express.static('src/public'));

nunjucks.configure(path.resolve(__dirname, 'public/views'), {
  express: app,
  autoscape: true,
  noCache: false,
  watch: true
});
app.use(session({
  secret: "session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


const Pin=require('./models/pin');
const User=require('./models/user');
const db=require('./mdb');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (user, next) {
    next(null, user);
  });



passport.use('local', new LocalStrategy((username, password, done) => {
  
    User.findOne({ name: username }, (err, user) => { 
      if (err) { return done(err); }
      if (!user) { return done(null, null, { message: 'No user found!' }); }
      if (user.password !== password) {
        return done(null, null, {message: 'Username or password is incorrect!'});
      }
  
      return done(null, user, null);
    });
  }
  ));



function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  }  


app.get('/',(req,res)=>{
    res.render('index.html',{});
   
});
app.get('/login',(req,res)=>{
    res.render('login.html',{});
});
app.get('/admin',isAuthenticated,(req,res)=>{
    res.render('admin.html',{});
});
app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect('/');
});


app.post('/login', (req, res) => {
    // passport.authenticate('local', { successRedirect: '/admin', failureRedirect: '/login' }
    passport.authenticate('local', function (err, user, info) {
      //  console.log(err,user,info);
      if (err) {
        res.render('login.html', { error: err });
      } else if (!user) {
        res.render('login.html', { errorMessage: info.message });
  
      } else {
        //setting users in session
        req.logIn(user, function (err) { 
          if (err) {
            res.render('/', { error: err });
          } else {
            res.redirect('/admin');
          }
        })
      }
    })(req, res);
  });




app.get('/pincode',(req,res)=>{
    var pin=req.query.pin;

 Pin.find({pincode:pin},(err,data)=>{
         if(err){
             console.log("error")
         }
       else{
        res.render('pincode.html',{ data:data })
           
        }
     })
})

app.listen(3000,()=>{
    console.log(`server running at http://127.0.0.1:3000`);
});