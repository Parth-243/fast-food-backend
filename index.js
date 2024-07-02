const express = require('express');
const config = require('./config');

// Initialize mongodb connection
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.info('MongoDB successfully connected'))
  .catch((err) => console.error(err));

mongoose.set('debug', process.env.NODE_ENV === 'development');

// Initialize express instance
const app = express();

app.get('/', (request, response) =>
    response.send('Welcome to fast food backend!')
);

// handle unknown routes
app.all('*', (request, response) =>
    response.status(404).send('Resource not found.')
);

app.listen(config.PORT, () => console.info(`Server up and running on port ${config.PORT} !`));
