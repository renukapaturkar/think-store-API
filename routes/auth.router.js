const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {User} = require('../models/user.model.js');
const {findUserByEmail, saveNewUserDetails} = require('../controllers/user.controllers');

const generateNewToken = async(userId, res) => {
    jwt.sign(
        {userId}, 
        process.env.TOKEN_KEY, {expiresIn : '24h'},
        function(error, token){
            if(error){
                res.status(500).json({success: false, message: "Internal Server Error", errMessage: error.message});
            }
            res.status(200).json({success: true, token})
        }
    )
    
}

router.route('/signup')
.post(async(req,res)=> {
    try {
        const {email} = req.body;
        const user = await findUserByEmail(email);
        if(user){
            res.status(409).json({success: false, message: "email already exists"});
        }
        const { _id } = await saveNewUserDetails(req.body);
        return generateNewToken(_id, res)
    }catch(error){
        res.status(500).json({success: false, message: "Internal server error", errMessage: error.message })
    }
})


router.route('/login')
.post(async(req,res)=>{
    const {email, password} = req.body;
    const user = await findUserByEmail(email);
    if(!user){
        res.status(404).json({success: false, message: "email does not exists"});
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
        res.status(400).json({success: false, message: "Password is incorrect"})
    }
    return generateNewToken(user._id, res)
});


module.exports = router;