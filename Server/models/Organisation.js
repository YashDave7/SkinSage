const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrganisationSchema = new Schema({
    organisation_name: {
        type: String,
    },
    organisation_type: {
        type: String
    },
    government_id: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    address: {
        type: String
    }
});

module.exports = mongoose.model('organisation', OrganisationSchema);