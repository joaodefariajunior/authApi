const router = require('express').Router();
const verify= require('./verifyAuth');

router.get('/',verify,(req,res)=>{
    res.json({posts:{title:'my first post',description:"not for  eyes"}})
})

module.exports = router;