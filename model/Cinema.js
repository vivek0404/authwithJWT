const mongoose = require('mongoose');
const cinemaSchema = mongoose.Schema({
    city:{
        type:String,
        required:true
    },
    cinema:{
        type:String,
        required:true
    },
    movie:{
        type:String,
        required:true
    },
    showtime:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Cinema',cinemaSchema);