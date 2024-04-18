const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: { type: String },
    phone: { type: String },
    address: { type: String },
    products: { type: String },
    status: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
