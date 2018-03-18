const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  birhday: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  sex: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default:false
  }
});

UsersSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

UsersSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('User', UsersSchema);
