const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'declined'],
    default: 'pending'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
},{ timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);