const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
require("./config/passport");
const session = require("express-session");
const passport = require('passport');
const flash = require("connect-flash");
const information = require("./routes/information-route");


mongoose.connect(process.env.DB_CONNECT,
 {   
    useNewUrlParser:true,
    useUnifiedTopology:true,
 }
).then(() => {
    console.log("Connect to mongoDB atlas.");
}).catch((err) => {
    console.log(err);
});

//  middleware
app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req , res , next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
app.use("/auth", authRoute);
app.use("/profile" , profileRoute);

app.get("/" , (req ,res) => {
    res.render("index" , {user:req.user});
});

app.listen(8080 , () => {
    console.log("sever running on port 8080.");
});



// routes
app.use("/record/form" , express.static("./public"));
// app.use("/", information);
app.use("/api/v1/information", information);

