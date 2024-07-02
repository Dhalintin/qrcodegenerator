const UserService = require('../services/user.services');
const SocialService = require('../services/socials.service');
const ImageService = require('../services/image.service')
const ImageUtil = require('../utils/image.util');
const fs = require('fs')

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
            const image = await ImageService.findImage(userId)

            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User doesn't exist"
                })
            }
            console.log(image)

            return res.status(200).json({
                success: true,
                message: "Successful",
                data: {
                    user,
                    socials,
                    image
                }
            })

        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async uploadimage(req, res){
        const image = req.file;
        const userId = req.params.id
        try{
            const userImage = await ImageService.findImage(userId);

            if(userImage.length > 0){
                return res.status(500).json({
                    success: false,
                    message: "You already have an image"
                }) 
            }

            // Read the Image file to convert to Base64 String
            const filePath = image.path;
            const format = image.mimetype
            fs.readFile(filePath, async (err, data) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: `Error reading uploaded file: ${err}`
                    });
                }
          
                // Convert to Base64 String
                const imageData = data.toString('base64');

                // Store Image as Base64 String
                const newImage = await ImageService.storeImage(userId, imageData, format);

                // Delete Image
                const isDeleted = ImageUtil.deleteImage(filePath);

                if(!isDeleted){
                    res.status(200).json({
                        success: true,
                        message: "Image uploaded successfully! But not deleted",
                        data: newImage
                    })
                }

                return res.status(200).json({
                    success: true,
                    message: "Image uploaded successfully!",
                    data: newImage
                })

              });

        }catch(error){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}

module.exports = new UserController();