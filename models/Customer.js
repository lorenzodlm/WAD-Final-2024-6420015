const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Customer schema
const customerSchema = new Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    memberNumber: { type: Number, required: true },
    interests: { type: [String], required: true }
});

// Create the model from the schema
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
