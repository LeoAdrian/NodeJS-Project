var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");
var middleware = require("../middleware")
router.get("/", function(req,res){
    res.render("landing");
})


// ==============
//   AUTH ROUTES
// ==============

// SHOW SIGNUP FORM
router.get("/signup",function(req, res) {
    res.render("signup",{info:"Please insert your credentials",page:"signup"});
});

// HANDLE SIGNUP LOGIC
router.post("/signup",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup",{error:err.message});
        }    
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp "+user.username)
            res.redirect("/campgrounds");
        });
    });
});

// SHOW LOGIN FORM
router.get("/signin",function(req, res) {
    res.render("signin",{page:"signin"});
});

// HANDLING LOGIN LOGIC
// app.post("/signin",middleware,callback)
// router.post("/signin",passport.authenticate("local",
// {
//     successRedirect:("/campgrounds"),
//     failureRedirect:"/signin",
//     successFlash: "Login successful. Welcome, " + user + "!",
//     failureFlash: "Login failed, please try again."
    
// }),function(req,res){
// });

router.post("/signin", function(req, res, next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        } if(!user) {
            req.flash("error", "User or password incorrect.");
            return res.redirect("/signin");
        }
        req.logIn(user, function(err){
            req.flash('success','Welcome, '+user.username+'.You are now logged in.');
            res.redirect('/campgrounds');
        });
    })(req,res,next);
});

// LOGOUT ROUTE
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
})


module.exports = router;