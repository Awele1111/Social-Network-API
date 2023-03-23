const { Schema, model } = require('mongoose');
const validator = require('validator');
const moment = require('moment');

const reactionSchema = new Schema(
  {
    reactionId:
    {
      type:Schema.Types.ObjectId,
      default: () => new Types.ObjectId()

    },

    reactionBody:
    {
        type: String,
        required: true,
        maxLength: 200

    },
    username:
    {
        type:String,
        required: true 
    },

    createdAt:
    {
      type: Date,
      default: Date.now(),
      get: dateFormat,

    },

    
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      getters: true, 

    },
    id: false,
  }
);



module.exports = reactionSchema;
