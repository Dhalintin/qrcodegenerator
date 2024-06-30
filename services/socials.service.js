const Social = require('../models/socials.model');

class SocialService {
    // Save User Social media details
    async saveDetails(userId, facebook, linkedin, instagram, whatsapp, telegram, twitter){
        const userSocial = new Social({ userId, facebook, linkedin, instagram, whatsapp, telegram, twitter });
        userSocial.save()
        return userSocial;
    }

    async getSocials(userId){
        const userSocials =  Social.find({ userId })

        if(!userSocials){
            return res.status(404).json({
                success: false,
                message: "User doesn't have socials"
            })
        }

        return userSocials
    }
}

module.exports = new SocialService();
