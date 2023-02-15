const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Invoices APIs Document',
    description: 'APIs document for all operations on the inboxes app.',
    termsOfService: '',
    contact: {
      name: 'Phathutshedzo Khabubu',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger/output.json';
const endpointsFiles = ['./server.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
