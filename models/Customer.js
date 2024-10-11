import mongoose from "mongoose";

// Define the Customer schema
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    memberNumber: { type: Number, required: true },
    interests: { type: [String], required: false }
});

// Create the model from the schema
const Customer = mongoose.models.customer || mongoose.model('customer', customerSchema);

export default Customer;
