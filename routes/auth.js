const router = require('express').Router();
const User = require('../model/User');

const {
    registerValidation
} = require('../validation')







router.post('/register', async (req, res) => {
    try {
        const {
            error
        } = registerValidation(req.body);
        
        if (error)
            res.status(400).send(error.details[0].message);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err)
    }
});
module.exports = router;