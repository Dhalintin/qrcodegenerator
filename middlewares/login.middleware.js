const { loginSchemaValidation } = require('../validations/user.validation');


module.exports = (req, res, next) => {
    const { error } = loginSchemaValidation.validate(req.body);
    if(error){
        let errorMessage = error.message.replace(/"/g, '');
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
        return res.status(500).json({
            message: errorMessage
        })
    }else{
        next();
    }
}