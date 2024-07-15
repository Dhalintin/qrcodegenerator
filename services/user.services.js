const User = require('../models/user.model');
const Detail = require('../models/detail.model');

class UserService {
    // Save User Details
    async saveUser(firstname, lastname, email){
        const user = new User({ firstname, lastname, email });
        user.save();        
        return user;
    }

    async saveDetails(userId, jobtitle, phone, address, about){
        const detail = new Detail({ userId, jobtitle, phone, address, about });
        detail.save();        
        return detail;
    }

    async userEmail(email){
        const existingEmail = await User.findOne({ email })
        if( existingEmail ){
            return existingEmail;
        }
        return false;
    }

    async findDetails(userId){
        const userDetails = await Detail.findOne({ userId })
        if( userDetails ){
            return userDetails;
        }
        return false;
    }

    async getUser(userId){
        const user = await User.findOne({ _id: userId });
        if(!user){
            return false;
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

    async register(firstname, lastname, email, password) {
        const newUser = new User({ firstname, lastname, email, password });
        return await newUser.save();
    }
}

module.exports = new UserService();