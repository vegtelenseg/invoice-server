import { useEffect, useState } from 'react';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { InvoiceOverview } from './invoice/InvoiceOverview';
import Table from './table/Table';
import { Container } from '@mui/system';
import InvoiceProvider from './contexts/InvoiceContext';

function App() {
  const onDelete = (invoiceIds) => {
    invoiceIds.map(
      async (id) => await axios.delete(`http://localhost:5000/invoices/${id}`)
    );
  };

  const onAdd = async (payload) =>
    await axios.post('http://localhost:5000/invoices/', payload);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InvoiceProvider>
          <InvoiceOverview />
          <Table onDelete={onDelete} onAdd={onAdd} />
        </InvoiceProvider>
      </LocalizationProvider>
    </Container>
  );
}

export default App;
