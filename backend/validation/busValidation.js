const joi=require('joi');

const addbusSchema=joi.object({
    busNo:joi.number().required(),
    DriverName:joi.string().required(),
    ContactNo:joi.number().min(1000000000).max(9999999999).required(),
    type:joi.string().valid('permanent','temporary').required(),
    isActive:joi.boolean().default(true)
})
const editbusSchema=joi.object({
    busNo:joi.number(),
    DriverName:joi.string(),
    ContactNo:joi.number().min(1000000000).max(9999999999),
    type:joi.string().valid('permanent','temporary'),
    isActive:joi.boolean()
})
module.exports={addbusSchema,editbusSchema};