const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");

router.get("/login" , (req , res) => {
    res.render("login" , {user:req.user});
});

router.get("/signup" , (req , res) => {
    res.render("signup" , {user:req.user});
});


router.get("/logout" , (req , res) => {
    req.logOut();
    res.redirect("/");
});

router.post("/login" , passport.authenticate('local', { failureRedirect: '/auth/login' , failureFlash:"Wrong email or password."}),(req , res) => {
    if(req.session.returnTo) {
        let newPath = req.session.returnTo;
        req.session.returnTo = "";
        res.redirect(newPath);
    }else {
        res.redirect("/profile");
    }
});

router.post("/signup" ,async (req , res) => {
    
    
    let {name , email , password} = req.body;
    //  check data 在資料庫是不是已經存在
    const emailExist = await User.findOne({email});
    if(emailExist) {
        req.flash("error_msg" , "email has already exist.");
        return res.redirect("/auth/signup");
        //  不知道為什麼這邊要加return , 不然會有error
    }
    const hash = await bcrypt.hash(password , 10);
    password = hash;
    let newUser = new User({name , email , password});
    try{
        await newUser.save();
        req.flash("success_msg" , "Registration success. You can login now!");
        res.redirect("/auth/login");
    } catch (err) {
        req.flash("error_msg" , err.errors.name.properties.message);
        res.redirect("/auth/signup");
    }

});

router.get("/google" , passport.authenticate("google" , {
    scope: ["profile", "email"],
    prompt: "select_account",
}));

router.get("/google/redirect" , passport.authenticate("google") , (req , res) => {
    if(req.session.returnTo) {
        let newPath = req.session.returnTo;
        req.session.returnTo = "";
        res.redirect(newPath);
    }else {
        res.redirect("/profile");
    }
});

module.exports = router;