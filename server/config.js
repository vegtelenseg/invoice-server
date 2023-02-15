const { default: mongoose } = require('mongoose');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/example.log',
    }),
  ],
});

const dbInstance = () => {
  const dbUri = 'mongodb://localhost:27017/gallant_shirley';

  mongoose.connect(
    dbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('Database connected')
  );
  return mongoose.connection;
};

module.exports = {
  logger,
  dbConn: dbInstance(),
};
