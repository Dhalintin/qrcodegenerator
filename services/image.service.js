const Image = require('../models/image.model.js');

class ImageService{
    async storeImage(userId, imageData, format){
        const newImage = new Image({ userId, imageData, format });
        await newImage.save();
        return newImage;
    }

    async findImage(userId){
        const image = await Image.find({ userId })
        if(!image){
            return
        }
        return image
    }
}

module.exports = new ImageService