import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InvoiceContext } from '../contexts/InvoiceContext';
import moment from 'moment';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddInvoice({ open, setOpen, selected }) {
  const handleClose = () => setOpen(false);

  const invoices = React.useContext(InvoiceContext);

  // selected[0] because this function is only available when selected array has only one item
  const targetInvoice = invoices.find((invoice) => invoice._id === selected[0]);

  const schema = object().shape({
    invoiceNumber: string().required('Invoice number is required'),
    invoiceDate: string().required('Invoice date is required'),
    billTo: string().required('Invoice date is required'),
    invoiceDue: string().required('Invoice due date is required'),
    paid: string().required('Paid status is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    // TODO: Move base url to env var
    await axios.put(`http://localhost:5000/invoices/${targetInvoice._id}`, {
      ...data,
      id: targetInvoice._id,
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
            Edit Invoice: {targetInvoice.invoiceNumber}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="invoiceNumber"
              control={control}
              render={() => (
                <>
                  <TextField
                    error={!!errors.invoiceNumber}
                    label="Invoice No."
                    helperText={
                      errors.invoiceNumber ? errors.invoiceNumber.message : ''
                    }
                    fullWidth
                    {...register('invoiceNumber')}
                  />
                  <br />
                  <br />
                </>
              )}
            />

            <Controller
              name="invoiceDate"
              control={control}
              render={() => (
                <>
                  <DatePicker
                    label="Invoice Date"
                    error={!!errors.invoiceDate}
                    disableFuture
                    {...register('invoiceDate')}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        helperText={
                          errors.invoiceDate ? errors.invoiceDate.message : ''
                        }
                        {...params}
                      />
                    )}
                  />
                  <br />
                  <br />
                </>
              )}
            />

            <Controller
              name="invoiceDue"
              control={control}
              render={() => (
                <>
                  <DatePicker
                    label="Invoice Due"
                    error={!!errors.invoiceDue}
                    disablePast
                    {...register('invoiceDue')}
                    renderInput={(params) => (
                      <TextField
                        name="invoiceDue"
                        fullWidth
                        helperText={
                          errors.invoiceDue ? errors.invoiceDue.message : ''
                        }
                        {...params}
                      />
                    )}
                  />
                  <br />
                  <br />
                </>
              )}
            />

            <Controller
              name="billTo"
              control={control}
              render={() => (
                <>
                  <TextField
                    error={!!errors.billTo}
                    label="Bill to"
                    {...register('billTo')}
                    helperText={errors.billTo ? errors.billTo.message : ''}
                    fullWidth
                  />
                  <br />
                  <br />
                </>
              )}
            />

            <Controller
              name="paid"
              control={control}
              render={() => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        error={!!errors.paid ? errors.paid.message : ''}
                        {...register('paid')}
                        fullWidth
                      />
                    }
                    label="Paid"
                  />
                  <br />
                  <br />
                </>
              )}
            />
            <Button color="primary" type="submit" variant="contained" fullWidth>
              Create invoice
            </Button>
          </form>
        </Box>
      </>
    </Modal>
  );
}
