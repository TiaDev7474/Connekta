
const User = require('../../Model/User')


module.exports =  {

    verify :async (accessToken,refreshToken , profile , cb) => {
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
}
}