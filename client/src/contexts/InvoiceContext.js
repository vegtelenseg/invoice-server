import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const InvoiceContext = createContext({
  invoices: [],
});

const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/invoices').then(({ data }) => {
      console.log('Data: ', data);
      setInvoices(data);
    });
  }, []);

  return (
    <InvoiceContext.Provider value={invoices}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
