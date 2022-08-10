const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const loginValidation = require("../validation/validation").loginValidation;
const registerValidation = require("../validation/validation").registerValidation;
const jwt = require("jsonwebtoken");

// router.get("/login" , (req , res) => {
//     res.render("login" , {user:req.user});
// });

// router.get("/signup" , (req , res) => {
//     res.render("signup" , {user:req.user});
// });


// router.get("/logout" , (req , res) => {
//     req.logOut();
//     res.redirect("/");
// });

// router.post("/login" , passport.authenticate('local', { failureRedirect: '/auth/login' , failureFlash:"Wrong email or password."}),(req , res) => {
//     if(req.session.returnTo) {
//         let newPath = req.session.returnTo;
//         req.session.returnTo = "";
//         res.redirect(newPath);
//     }else {
//         res.redirect("/profile");
//     }
// });


//  用戶本地註冊
router.post("/register" , async(req , res ) => {
    console.log("接收註冊請求,準備驗證格式...");
    //  check the validation of data
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }  else {
        console.log("驗證完成...success!");
    }
    //  check if user exists
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) {
        return res.status(400).send("Email has already been registered.");
    }
    //  register the user
    const newUser = new User({
        email:req.body.email,
        username:req.body.username,
        password:req.body.password,
    });
    console.log("new user created! ready to save in...");
    console.log(newUser);
    
    try{
        const saveUser = await newUser.save();
        res.status(200).send({
            msg:"success!",
            saveObject:saveUser,
        })
    }catch(err) {
        console.log(err);
        res.status(400).send("User not saved.");
    }

});

//  本地登入處理
router.post("/login" , (req , res) => {
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    };
    User.findOne({email: req.body.email} , function(err , user){
        if(err) {
            res.status(400).send(err);
        };
        if(!user) {
            res.status(401).send("User not found!");
        }else {
            user.comparePassword(req.body.password , function(err , isMatch){
                if(err) {
                    return res.status(400).send(err);
                }

                if(isMatch) {
                    const tokenObject = {_id:user._id , email:user.email};
                    const token = jwt.sign(tokenObject , process.env.PASSPORT_SECRET);
                    res.send({success:true , token:"JWT " + token , user});
                }else{
                    console.log(err);
                    res.status(401).send("Wrong password!");
                }
            });
        }
    });

});

// router.post("/signup" ,async (req , res) => {
    
    
//     let {name , email , password} = req.body;
//     //  check data 在資料庫是不是已經存在
//     const emailExist = await User.findOne({email});
//     if(emailExist) {
//         req.flash("error_msg" , "email has already exist.");
//         return res.redirect("/auth/signup");
//         //  不知道為什麼這邊要加return , 不然會有error
//     }
//     const hash = await bcrypt.hash(password , 10);
//     password = hash;
//     let newUser = new User({name , email , password});
//     try{
//         await newUser.save();
//         req.flash("success_msg" , "Registration success. You can login now!");
//         res.redirect("/auth/login");
//     } catch (err) {
//         req.flash("error_msg" , err.errors.name.properties.message);
//         res.redirect("/auth/signup");
//     }

// });

//  Google登入
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

//  facebook登入
router.get("/facebook" , passport.authenticate("facebook"));

router.get('/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    if(req.session.returnTo) {
        let newPath = req.session.returnTo;
        req.session.returnTo = "";
        res.redirect(newPath);
    }else {
        res.redirect("/profile");
    }
  }
);

module.exports = router;