const { dbConn } = require('../config');
const Fakerator = require('fakerator');
const { createInvoice } = require('../services/invoice');
const fakerator = Fakerator('en-US');

maxRecords = 100;

const createInvoices = async (recordNumber) => {
  // Create recordNumber invoices
  for (let index = 0; index < recordNumber; index++) {
    const invoiceNumber = fakerator.address.postCode();
    const invoiceDate = fakerator.date.recent(30);
    const invoiceDue = fakerator.date.future(0.01, new Date());
    const billTo = fakerator.names.name();
    const tax = fakerator.random.number(10, 100);
    const amount = fakerator.random.number(100, 1000);
    const paid = fakerator.random.boolean(50);
    const total = amount + tax;
    await createInvoice({
      invoiceNumber,
      invoiceDate,
      invoiceDue,
      billTo,
      tax,
      total,
      amount,
      paid,
    });
  }
  dbConn.close();
};
createInvoices(maxRecords);
