const{Mongoose,models,Schema, model} =require("mongoose");


const ServiceSchema = new Schema({
    service : {
        type : String,
        required :true
    },
    description : {
        type : String,
        required :true
    },
    price : {
        type : Number,
        required :true
    },
    provider : {
        type : String,
        required :true
    }
})
const Service = new model("Service",ServiceSchema)

module.exports =Service;