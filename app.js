var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    methodOverride   = require("method-override"),
    Campground       = require("./models/campground"),
    seedDB           = require("./seeds"),
    Comment          = require("./models/comment"),
    User             = require("./models/user");

 
// Requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
 
// Default value for db env.var 
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp" 

mongoose.connect(url,{useMongoClient:true});


mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

// Moment npm
app.locals.moment= require("moment");
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Dio is goddo",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error   = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info    = req.flash("info");
    next();
})

app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp server has started");
});
