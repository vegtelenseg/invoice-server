const { Router } = require('express');
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoice');

const router = Router();

router.get('/invoices', getInvoices);

router.get('/invoices/:id', getInvoiceById);

router.post('/invoices', createInvoice);

router.put('/invoices/:id', updateInvoice);

router.delete('/invoices/:id', deleteInvoice);

module.exports = router;
