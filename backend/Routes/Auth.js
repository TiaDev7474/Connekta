const router = require('express').Router()
const FacebookStrategy = require('passport-facebook')

require('dotenv').config();

const authController = require('../Controller/Auth')
const passport = require('passport');
const User = require('../Model/User');

passport.use( new FacebookStrategy({
     clientID : process.env['FACEBOOK_APP_ID'],
     clientSecret: process.env['FACEBOOK_APP_SECRET'],
     callbackURL: '/auth/redirect/facebook',
     state:true
}, async  function verify(accessToken,refreshToken , profile , cb){
    try{
        const user = await User.findOne(
            {
                'federated_credential.provider':"https://facebook.com",
                'federated_credential.profileID': profile.id 
            })
        if(!user){
            const newUser = new User({
                 username: profile.displayName,
                 federated_credentionls:{
                     profileID:profile.id,
                     provider:"https://facebook.com",
                 },
                 account_verify:true

            })
            try{
                const result = await newUser.save()
                // console.log(result)
                // if(!result) return res.status(500).json({message:'Unexpected error occured'})
                // return res.status(201).json({result,message:'Succesfully logged in with facebook account'})
            }catch(err){
                // return res.status(500).json({message:'Unexpected error occured'})
            }
        }else{
            // return res.status(201).json({user,message:'Succesfully logged in with facebook account'})
        }
    }catch(err){
        //  return res.status(500).json({message:'Unexpected error occured'})
    }
     
      
}))

passport.serializeUser(function(user,cb) {
    process.nextTick( function (){
        cb(null,{id:user._id, username:user.username})
    })
})

passport.deserializeUser(function(user,cb){
     process.nextTick(function(){
         cb(null,user)
     })
})



router.get('/login/federated/facebook', passport.authenticate('facebook'));
router.get('/redirect/facebook',passport.authenticate('facebook',{
     successRedirect:'/',
     failureRedirect:'/login'
}))
router.post('/login',authController.loginUser)
router.post('/register',authController.register)

module.exports = router