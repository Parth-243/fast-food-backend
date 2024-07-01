const express = require('express');
const config = require('./config');

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
