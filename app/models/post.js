var mongoose = require('mongoose');

//creating the template for our post data
var postSchema = mongoose.Schema({
    _posterId: { type: String, ref:'User'},
    title: String,
    rooms: Number,
    price: Number,
    date: {type: Date, default: Date.now},
    content: String,
    wifi: Boolean,
    pets: Boolean,
    parking: Boolean,
    laundry: Boolean,
    furnished: Boolean,
    smoking: Boolean

});

//saving the data into a var
var Post = mongoose.model('Post', postSchema);

//This is used to ref this in another place
module.exports = Post;