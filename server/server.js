require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const routes = require('./routes/invoices');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

// Implement A Swagger API Documentation Page
const swaggerDocument = require('./swagger/output.json');
const { dbConn, logger } = require('./config');
const app = express();

app.use(cors());
app.use(xss());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  logger.error('SIGTERM signal received.');
  logger.error('Closing the database connection');
  dbConn.close();
});
