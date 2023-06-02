const User = require('../Model/User')
module.exports = {
    findUserByEmail: async (email) => {
        
            return  await User.findOne({email: email})
        
    },
    findUserById: async (id) => {
        const response = await User.findById(id)
        return response
    }
}