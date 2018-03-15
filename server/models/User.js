const mongoose = require('mongoose');

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
  isDeleted: {
    type: Boolean,
    default:false
  }
});

UsersSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcyrpt.genSaltSync(8),null);
};

UsersSchema.methods.validPasswords = function(password){
	return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('User', UsersSchema);