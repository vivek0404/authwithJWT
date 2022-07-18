const router = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {regvalidation,loginvalidation} = require('../validation');
const jwt = require('jsonwebtoken');

router.get('/', (req,res)=>{
    res.send("inside register");
})
router.post('/register', async(req,res)=>{
    const {error} = regvalidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const emailexist = await User.findOne({email:req.body.email});
    if(emailexist) return res.status(400).send("Email is already exists");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);  
   // res.send(hashedPassword);
    
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    try {
        const Saveduser = await user.save();
        res.status(200).send({user:Saveduser._id});
    } catch (err) {
        res.status(400).send({status:failed, msg: err});
    }
});

router.post('/login', async(req,res)=>{
    const {error} = loginvalidation(req.data);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid user");

    const validpass = await bcrypt.compare(req.body.password, user.password);
    if(!validpass) return res.status(400).send("Invalid pass");

    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
})


module.exports = router;
