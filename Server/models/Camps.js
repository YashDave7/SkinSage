const mongoose = require('mongoose');
const { Schema } = mongoose;

const CampsSchema = new Schema({
    organisation_name: {
        type: mongoose.Schema.Types.ObjectId
    },
    date_of_camp: {
        type: String
    },
    location: {
        type: String,
    },
    speciality: {
        type: String
    },
    details: {
        type: String
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    payment: {
        type: String
    }
});

module.exports = mongoose.model('camps', CampsSchema);