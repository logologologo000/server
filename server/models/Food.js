const mongoose = require('mongoose');


const FoodSchema = new mongoose.Schema({
    foodName: {
        type: 'string',
        required: true,
        
    },
    daysSinceIAte: {
        type: Number,
        required: true
    }
})
const Food = mongoose.model("foods", FoodSchema)
module.exports = Food