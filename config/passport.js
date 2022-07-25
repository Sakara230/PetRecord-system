const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const FacebookStrategy = require("passport-facebook");

passport.serializeUser((user , done) => {
    console.log("serializing user now.");
    done(null , user._id);
    //  mongoDB 每一筆資料自動產生ID, _id有加底線
});

passport.deserializeUser((_id , done) => {
    console.log("Deserializing user now.");
    User.findById({_id}).then((user) => {
        console.log("found user.");
        done(null , user);
    });
});

//  local strategy 本地登入認證
passport.use(new LocalStrategy( (username , password , done) => {
    console.log(username , password);
    User.findOne({email: username}).then(async (user) => {
        if(!user) {
            return done(null , false);
        }
        await bcrypt.compare(password , user.password , function(err , result){
            if(err){
                return done(null , false);
            }
            if(!result) {
                return done(null , false);
            }else{
                return done(null , user);
            }
        });
       
    }).catch(err => {
        return done(null , false);
    })
}))

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"/auth/google/redirect",
},
//  passport callback function
(accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({googleID:profile.id}).then((foundUser) => {
        if(foundUser) {
            console.log("user already exist.");
            done(null , foundUser);
        }else{
            new User({
                name:profile.displayName,
                googleID:profile.id,
                thumbnail:profile.photos[0].value,
                email:profile.emails[0].value,
            }).save().then((newUser) => {
                console.log("new user created!");
                done(null , newUser);
            });
        }
    });

}));

//  設定Facebook登入策略
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/redirect"
  },
  function(accessToken, refreshToken, profile, done) {
   console.log(profile);
   User.findOne({facebookID:profile.id}).then((foundUser) => {
    if(foundUser) {
        console.log("user already exist.");
        done(null , foundUser);
    }else{
        new User({
            name:profile.displayName,
            facebookID:profile.id,
            
            
        }).save().then((newUser) => {
            console.log("new user created!");
            done(null , newUser);
        });
    }
});
  }
));