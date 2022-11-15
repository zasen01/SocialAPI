
const { Schema, model} = require('mongoose');
const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'Thought Content Is Required.', 
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
  },
  reactions:[ReactionSchema]

},{
    toJSON:{getters:true},
    id:false
});

ThoughtSchema.virtual("ReactionCount").get(function(){
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;