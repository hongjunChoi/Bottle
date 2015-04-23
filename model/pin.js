var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var pinSchema   = new Schema({
    name: String,
    description : String,
    lat : Number,
    lon : Number
});

module.exports = mongoose.model('Pin', pinSchema);