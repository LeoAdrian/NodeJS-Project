var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");
var middleware = require("../middleware");
var Campground = require("../models/campground")
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
    // admin code
    var newUser = new User({
        username:req.body.username,
        firstName:req.body.firstName, 
        lastName:req.body.lastName, 
        email:req.body.email,
        avatar:req.body.avatar
        
    });
    if(req.body.adminCode === "secretcode123") {
        newUser.isAdmin = true;
        req.flash("success","Remember "+req.body.username+ ",with great power comes great responsability");
    }
   // eval(require("locus")); //- freezes code
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup",{error:err.message});
        }    
        passport.authenticate("local")(req,res,function(){
            if(newUser.isAdmin === false){
            req.flash("success","Welcome to YelpCamp, "+user.username); 
            }
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
            req.flash("error", "User or password are incorrect.");
            return res.redirect("/signin");
        }
        req.logIn(user, function(err){
            if(user.isAdmin === false){
            req.flash('success','Welcome, '+user.username+'.You are now logged in.');
            } else {
                req.flash("success", "Welcome back, master "+user.username);
            }
            res.redirect('/campgrounds');
        });
    })(req,res,next);
});

// LOGOUT ROUTE
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/campgrounds");
})

// USER PROFILE ROuTE
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err,foundUser){
        if(err){
            req.flash("error","Something went wrong.Please retry");
            res.redirect("/campgrounds");
        } else {
            Campground.find().where("author.id").equals(foundUser.id).exec(function(err,campgrounds){
                if(err){
                  req.flash("error","Something went wrong.Please retry");
            res.redirect("/campgrounds");  
                } else{
                    console.log(campgrounds);
                    res.render("users/show", {user: foundUser, campgrounds:campgrounds});
            }
        })
        }
    })
})

module.exports = router;