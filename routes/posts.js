const router = require("express").Router();
const verify = require('../routes/verifyToken');

router.get('/',verify, (req,res)=>{
    res.json({
        post:{
            title:"first Post",
            description:"sdfhkfhgkdfg"
        }
    })
})

module.exports = router;