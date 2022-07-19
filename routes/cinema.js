const router = require("express").Router();
const Cinema = require('../model/Cinema');
const verify = require('../routes/verifyToken');

router.post('/addmovie',verify, async(req,res)=>{
    
    
    
    const cinema = new Cinema({
        city:req.body.city,
        cinema:req.body.cinema,
        movie:req.body.movie,
        showtime:req.body.showtime
    }); 

    
  

    try {
        const Savecinema = await cinema.save();
        res.status(200).send({cinema:Savecinema._id});
    } catch (err) {
        res.status(400).send({status:failed, msg:err});
    }
});

//Ability to view all the movies playing in your city 

router.get('/playingmovie/:city',verify, async(req,res)=>{
    var response = await Cinema.find({city: req.params.city});
    res.json(response);
})

//Ability to check all cinemas in which a movie is playing along with all the showtimes.

router.get('/showtime/',verify, async(req,res)=>{
    var response = await Cinema.find();
    var response1 = await Cinema.find({movie:{$exists:true}}).distinct("showtime").sort()
    console.log(response1);
    res.json(response1);
})


module.exports = router;