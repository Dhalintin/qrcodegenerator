const User = require('../models/user.model');

class UserService {
    // Save User Details
    async saveDetails(firstname, lastname, email, address, about){
        const user = new User({ firstname, lastname, email, address, about })
        user.save();
        return user;
    }

    async userEmail(email){
        const existingEmail = await User.findOne({ email })
        if( existingEmail ){
            return existingEmail;
        }
        return false;
    }

    async getUser(userId){
        const user = await User.findOne({ _id: userId });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        return user
    }

    async getUsers(){
        const users = await User.find();
        if(!users){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        return users
    }
}

module.exports = new UserService();