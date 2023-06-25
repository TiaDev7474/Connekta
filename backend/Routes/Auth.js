const router = require('express').Router();
const User = require("../Model/User");
const { authMiddleware } = require('../Middleware/Auth');
const authController = require('../Controller/Auth');
const passport = require('passport');
const { verify } = require('../Services/Third_party_auth.js/facebookLogin');
const { rateLimiter } = require('../Middleware/RateLimiting');


const FacebookStrategy = require('passport-facebook').Strategy;

require('dotenv').config();

//facebook strategy
passport.use( new FacebookStrategy({
    clientID : process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: '/auth/redirect/facebook',
    profileFields: ['id', 'displayName', 'email','picture.type(large)'],
    state:true,
}, async (accessToken,refreshToken , profile , cb) => {
    try{
        const user = await User.findOne({'federated_credential.profileID': profile.id })
        if(!user){
            const newUser = new User({
                 username: profile.displayName,
                 federated_credentials:{
                     profileID:profile.id,
                     provider:"https://facebook.com",
                 },
                 email:profile.emails[0]?.value,
                 account_verify:true,
                 profilURL:profile.photos[0].value
            })
            try{
                 const result =  await newUser.save() 
                 return cb(null, newUser)
              
               
            }catch(err){
                return cb(err)
            }
        }else{
            return cb(null , user)
        }
    }catch(err){
        return cb(err)
        //  return res.status(500).json({message:'Unexpected error occured'})
    }
}));


passport.serializeUser(function(user,cb) {
   process.nextTick( function (){
       cb(null,user)
   })
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        User.findById(user._id)
            .then( user => {
                 if(user) return cb(null,user)
                 return cb(null,false)
            }).catch(err => cb(err))
    });
});

//facebook login route
router.get('/login/federated/facebook', passport.authenticate('facebook'));
router.get('/redirect/facebook',passport.authenticate('facebook',{
     successRedirect:'http://localhost:3000/auth/register',
     failureRedirect:'http://localhost:3000/auth/login'
}));

//other routes
router.post('/login', rateLimiter ,authController.loginUser);
router.post('/register',authController.register);
router.post('/verify',authMiddleware,authController.verifyOtp);
router.post('/resendcode',authMiddleware,authController.resendOtp);

module.exports = router;