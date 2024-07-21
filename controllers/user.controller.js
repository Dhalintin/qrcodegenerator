const UserService = require('../services/user.services');
const SocialService = require('../services/socials.service');
const ImageService = require('../services/image.service')
const ImageUtil = require('../utils/image.util');
const fs = require('fs');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

class UserController {
    async signup(req, res){
        try{
            const { firstname, lastname, email, password }  = req.body;
            
            const existingUser = await UserService.userEmail(email);
            if(existingUser){
                return res.status(400).json({
                    success: false,
                    message: "This email has already been used by another user"
                })                
            }

            const passwordHash = await argon2.hash(password, {
                type: argon2.argon2id,
                saltLength: 16,
                timeCost: 5,
                memoryCost: 2048,
            });
            const newUser = await UserService.register(firstname, lastname, email, passwordHash);
            
            if(!newUser){
                return res.status(500).json({
                    success: false,
                    message: "Registration failed!"
                })
            }

                       
            return res.status(200).json({
                success: true,
                message: 'Successful!',
                data: newUser
            })

        }catch(error){
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req, res){
        try{
            const { email, password } = req.body;
            const user = await UserService.userEmail(email);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "Username or password incorrect!"
                })
            }
            const details = await UserService.findDetails(user._id);

            const isVerified = await argon2.verify(user.password, password);
            if(!isVerified){
                return res.status(401).json({
                    success: false,
                    message: "Authentications failed"
                });
            }

            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                firstname: user.firstname,
            }, process.env.JWT_KEY, {
                expiresIn: "24h",
            });

            return res.status(200).json({
                success: true,
                message: "Login Successful",
                user: user,
                detail: details,
                token: token
            })
        }catch(error){
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }

    async save(req, res){
        try{
            const { 
                firstname, lastname, email, address, about, facebook, linkedin, instagram, whatsapp, telegram, twitter, jobtitle, phone 
            } = req.body

            const existingUser = await UserService.userEmail(email);

            if(existingUser){
                console.log(existingUser)
            }

            const user = await UserService.saveUser(firstname, lastname, email);
            const userId = user._id;
            const details = await UserService.saveDetails(userId, jobtitle, phone, address, about)
            const socials = await SocialService.saveDetails( userId, facebook, linkedin, instagram, whatsapp, telegram, twitter)

            return res.status(200).json({
                success: true,
                message: "User created successfully",
                data: {
                    user,
                    details,
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
            const details = await UserService.findDetails(userId);
            const socials = await SocialService.getSocials(userId)
            const image = await ImageService.findImage(userId)

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
                    details,
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

    async getDetails(req, res){
        const userId = req.params.id;

        const details = await UserService.getDetail(userId);

        if(details.length > 0){
            console.log(details)
            return res.status(200).json({
                success: false,
                message: "No detail retrieved"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Successful",
            data: details
        })
    }
}

module.exports = new UserController();