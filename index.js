const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const config = require('./config');

// Initialize mongodb connection
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.info('MongoDB successfully connected'))
  .catch((err) => console.error(err));

mongoose.set('debug', process.env.NODE_ENV === 'development');

// Initialize express instance
const app = express();

app.use(cookieParser());

// Enable CORS for specific origins with credentials
const corsOptions = {
  origin: (origin, callback) => {
    if (config.ALLOWED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// parse body params and attach them to req.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// registering app routes
app.use(routes);

// handle unknown routes
app.all('*', (request, response) =>
  response.status(404).send('Resource not found.')
);

app.listen(config.PORT, () =>
  console.info(`Server up and running on port ${config.PORT} !`)
);
