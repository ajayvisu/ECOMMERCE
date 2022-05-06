const mongoose      = require("mongoose");
const crypto        = require("crypto");

const userSchema = new mongoose.Schema(
    {
    userName: {type: String, required: true, unique: true},
    eMail: {type: String, required: true, unique: true},
    mobileNo: {type: String, required: true},
    passWord: {type: String, required: true, unique: true},
    admin: {type: Boolean, default: false},
    uuid: {type: String, required: false},
    }, 
    {timestamps: true}
);
    userSchema.pre('save', function(next){
    this.uuid = 'USER-'+crypto.pseudoRandomBytes(5).toString('hex').toUpperCase()
    console.log(this.uuid);
    next();
});  

module.exports = mongoose.model('user', userSchema);