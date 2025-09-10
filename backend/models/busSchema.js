const mongoose=require('mongoose');
const stopSchema=require('./stopSchema.js')

const busSchema=new mongoose.Schema({
    busNo:{
        type:Number,
        required:true,
        unique:true,
        min:[1,"Bus Number should be Positive"],
        validate: {
            validator: function(v) {
                return !isNaN(v) && v > 0;
            },
            message: 'Bus number must be a valid positive number'
        }
    },
    DriverName:{
        type:String,
        required: [true, 'Driver name is required'],
        trim: true
    },
    ContactNo:{
        type:Number,
        required:true,
        unique:true,
        validate: {
            validator: function(v) {
                return !isNaN(v) && v > 0;
            },
            message: 'Contact number must be a valid positive number'
        }
    },
    stops:[
        stopSchema
    ],
    type:{
        type:String,
        enum:['permanent','temporary'],
        default:'temporary'
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const busModel=mongoose.models.bus || mongoose.model('bus',busSchema);
module.exports=busModel;