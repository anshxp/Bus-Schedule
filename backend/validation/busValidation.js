const joi = require('joi');

const stopSchema = joi.object({
  _id: joi.string(),
  stopName: joi.string().required(),
  firstShift: joi.string().allow('').default(''),
  secondShift: joi.string().allow('').default('')
});

const addbusSchema = joi.object({
  busNo: joi.number().required(),
  DriverName: joi.string().required(),
  ContactNo: joi.number().min(1000000000).max(9999999999).required(),
  type: joi.string().valid('permanent','temporary').required(),
  isActive: joi.boolean().default(true),
  stops: joi.array().items(stopSchema).optional() // ✅ make stops optional for initial creation
});

const editbusSchema = joi.object({
  busNo: joi.number(),
  DriverName: joi.string(),
  ContactNo: joi.number().min(1000000000).max(9999999999),
  type: joi.string().valid('permanent','temporary'),
  isActive: joi.boolean(),
  stops: joi.array().items(stopSchema) // ✅ optional on edit
});

module.exports = { addbusSchema, editbusSchema };
