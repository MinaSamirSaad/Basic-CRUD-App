const mongoose = require('mongoose'),
      {Schema} = mongoose;

const eventSchema = new Schema({ 
    title : {
        type : String
    },
    price : {
        type : Number
    } ,
    description : {
        type : String
    }
});

const eventModel =  mongoose.model('Event' , eventSchema);

module.exports = eventModel;