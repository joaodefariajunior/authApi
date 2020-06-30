const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {
    registerValidation,
    loginValidation
} = require('../validation');
const jwt = require('jsonwebtoken');






router.post('/register', async (req, res) => {
    try {
        const {error} = registerValidation(req.body);

        if (error) return res.status(400).send(error.details[0].message);
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) return res.status(400).send('Email already exists!');

        //scrambling the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        const savedUser = await user.save();
        res.send({
            user: user.id
        });

    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong!');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Password/user');
    
    const token=jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    return res.header('auth-token',token).send(token)
});
module.exports = router;