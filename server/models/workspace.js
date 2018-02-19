const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const workspace = new mongoose.Schema({
    fullName: {
        type: String,
        default: ''
    },
    displayName: {
        type: String,
        default: ''
    },
    adminUser: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    
});

workspace.methods.generateHash = function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

workspace.methods.validPassword = function(password){
	return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('Workspace', workspace);
