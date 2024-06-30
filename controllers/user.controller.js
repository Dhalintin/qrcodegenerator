const UserService = require('../services/user.services');
const SocialService = require('../services/socials.service');

class UserController {
    async save(req, res){
        try{
            const { 
                firstname, lastname, email, address, about, facebook, linkedin, instagram, whatsapp, telegram, twitter 
            } = req.body

            const existingEmail = await UserService.userEmail(email);

            if(existingEmail){
                return res.status(400).json({
                    success: false,
                    message: "Email already in use"
                })
            }

            const user = await UserService.saveDetails(firstname, lastname, email, address, about);
            const userId = user._id;
            const socials = await SocialService.saveDetails( userId, facebook, linkedin, instagram, whatsapp, telegram, twitter)

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: {
                    user,
                    socials,
                    link: `https://dhalintin.github.io/qrcodegenerator/${user._id}`
                }

            })
        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async getusers(req, res){
        try{
            const users = await UserService.getUsers()

            if(!users){
                return res.status(404).json({
                    success: false,
                    message: "No user exists"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Successfull",
                data: users
            })

        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async getuser(req, res){
        const userId = req.params.id
        try{
            const user = await UserService.getUser(userId);
            const socials = await SocialService.getSocials(userId)

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist"
                })
            }

            return res.status(200).json({
                success: true,
                message: "Successful",
                data: {
                    user,
                    socials
                }
            })

        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = new UserController();