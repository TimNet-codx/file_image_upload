const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: true,
    },
});

module.exports = mongoose.model('Product', ProductSchema);