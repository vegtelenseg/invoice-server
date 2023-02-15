const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true },
  invoiceDue: { type: Date, required: true },
  billTo: { type: String, required: true },
  paid: { type: Boolean, required: true },
  tax: { type: Number, required: true },
  amount: { type: Number, required: true },
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
