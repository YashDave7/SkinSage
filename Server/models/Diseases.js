const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiseasesSchema = new Schema({
    disease: {
        // locations: [{location: String, count: Number}]
        type: String
    },
    location: {
        type: String
    },
    count: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('diseases', DiseasesSchema);