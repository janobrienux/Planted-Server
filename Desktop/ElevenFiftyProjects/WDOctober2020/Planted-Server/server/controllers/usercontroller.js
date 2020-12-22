const { Router } = require("express");
const  { User }  = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const router = Router();




router.post('/register', async (req, res) => {
  let { firstName, lastName, email, password, profileImg, admin } = req.body.user;

    try {
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 13),
            profileImg,
            admin
        })
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
        res.status(201).json({
            message: 'User Registered!',
            user: newUser,
            token: token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'Email already in use.'
            })
        } else {
            res.status(500.).json({
                message: 'Failed to register user',
                error:error
            })
        }
    }
})

router.post('/login', async (req, res) => {
    let {email, password} = req.body;
    try{
        let loginUser = await User.findOne({
            where: {email}
        })
        if (loginUser && await bcrypt. compare(password, loginUser.password)){
            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.status(200).json({
                message: 'Login Successful',
                user: loginUser,
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Login: Failed: User information Incorrect'
            })
        }
    } catch (error){
        res.status(500).json({error: 'Error Loggin In'})
    }
})

module.exports = router;




