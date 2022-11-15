const { Schema, SchemaTypes, Types } = require('mongoose');

const ReactionSchema = new Schema({
  reactionId:{
    type: SchemaTypes.ObjectId,
    default:() => new Types.ObjectId()
  },
    reactionBody: {
    type: String,
    required: 'Reaction Content Is Required.', 
    minlength: 1,
    maxlength: 280
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  username: {
    type: String,
    required: true
  }

},{
    toJSON:{getters:true},
    id:false
});


module.exports = ReactionSchema;