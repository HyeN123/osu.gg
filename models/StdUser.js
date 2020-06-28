var mongoose = require('mongoose');

var std_userSchema = mongoose.Schema({
    user_name:{type: String, required: true, unique: true},
    user_id:{type: String, required: true, unique: true},
    user_country:{type:String},
    user_playCount:{type: String},
    user_grank:{type: String},
    user_crank:{type: String},
    user_performance:{type: String},
    countSS:{type: String},
    countSSH:{type: String},
    countS:{type: String},
    countSH:{type: String},
    countA:{type: String},
    update_time: {type: String}

}, {
    writeConcern: {
        j: true,
        wtimeout: 1000
      }
});

var StdUser = mongoose.model('std_user', std_userSchema);

module.exports = StdUser;