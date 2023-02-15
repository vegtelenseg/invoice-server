const { logger } = require('../config');
const invoice = require('../models/invoice');
const {
  getAllInvoices,
  getInvoiceById: getInvoiceByIdService,
  updateInvoice: updateInvoiceService,
  createInvoice: createInvoiceService,
  deleteInvoice: deleteInvoiceService,
} = require('../services/invoice');

// Implement Creating An Invoice Using Best Practices
const createInvoice = async (req, res) => {
  try {
    const createdInvoice = await createInvoiceService(req.body);
    res.status(200).json(createdInvoice);
  } catch (error) {
    // TODO: Better-report the error
    logger.info({
      message: 'Could not create invoice',
      level: 'error',
    });
    res.status(500).json({ message: `Could not create invoice ${error}` });
  }
};

// Implement Updating An Invoice By Id Using Best Practices
const updateInvoice = async (req, res) => {
  console.log('REQ: ', req.body);
  const {
    id,
    invoiceDate,
    invoiceDue,
    invoiceNumber,
    billTo,
    paid,
    tax,
    total,
  } = req.body;
  try {
    const invoice = await updateInvoiceService(id, {
      invoiceNumber,
      invoiceDate,
      invoiceDue,
      billTo,
      paid,
      tax,
      total,
    });
    console.log('Updated invoice: ', invoice);
    res.status(200).json(invoice);
  } catch (error) {
    logger.info({ error: 'Could not update invoice', message: error.message });
    res.status(500).json(`Could not update invoice: ${req.body.invoiceNumber}`);
  }
};

// Implement Deleting An Invoice By Id Using Best Practices
const deleteInvoice = async (req, res) => {
  try {
    const deletedItem = await deleteInvoiceService(req.params.id);
    res.status(200).json(`Invoice deleted: ${deletedItem.invoiceNumber}`);
  } catch (error) {
    logger.info(`Could not delete invoice: ${req.params.id}`);
    res.status(500).json(error.message);
  }
};

// Implement Getting Invoices Using Best Practices
const getInvoices = async (req, res) => {
  try {
    const allInvoices = await getAllInvoices();
    res.status(200).json(allInvoices);
  } catch (error) {
    logger.info('Could not get invoices');
    res.status(500).json('Could not get invoices');
  }
};

// Implement Getting Invoice By Id Using Best Practices
const getInvoiceById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json('Pass an invoice ID param as part of the request');
    }
    const invoice = await getInvoiceByIdService(id);
    if (!invoice) {
      res.status(404).json('No such document exists');
    }
    res.status(200).json(invoice);
  } catch (error) {}
  res.json(invoice);
};

module.exports = {
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoices,
  getInvoiceById,
};
