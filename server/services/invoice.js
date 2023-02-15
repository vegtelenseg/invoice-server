const { logger } = require('../config');
const Invoice = require('../models/invoice');

const createInvoice = async (payload) => {
  const createdInvoice = await Invoice.create(payload);
  return createdInvoice;
};

const getAllInvoices = async () => {
  return await Invoice.find();
};

const getInvoiceById = async (invoiceId) => {
  return await Invoice.findOne({
    invoiceNumber: invoiceId,
  });
};

const deleteInvoice = async (invoiceId) => {
  if (!invoiceId) {
    throw Error('Please provide ID of invoice');
  }
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    throw Error('No such document exists');
  } else {
    invoice.remove();
  }
  return invoice;
};

const updateInvoice = async (invoiceId, payload) => {
  if (!invoiceId) {
    throw Error('Please provide ID of invoice');
  }
  const invoice = await Invoice.findById(invoiceId);
  if (!invoice) {
    throw Error('No such document exists');
  } else {
    try {
      await invoice.updateOne({
        invoiceId,
        ...payload,
      });
    } catch (error) {
      logger.info(`Could not update Invoice: ${error}`);
      throw Error(error);
    }
  }
  return invoice;
};

module.exports = {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  deleteInvoice,
  updateInvoice,
};
