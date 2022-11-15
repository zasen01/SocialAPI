
const { Schema, model, SchemaTypes } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: 'Username is Required'
  },

  email: {
    type: String,
    unique: true,
    match: [/.+@.+\..+/]
  },
  thoughts:[{
    type: SchemaTypes.ObjectId,
    ref: "Thought"
  }],
  friends:[{
    type:SchemaTypes.ObjectId,
    ref: "User"
  }],

  userCreated: {
    type: Date,
    default: Date.now
  }
},{
    toJSON:{virtuals:true},
    id:false
});


UserSchema.virtual("FriendCount").get(function(){
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
