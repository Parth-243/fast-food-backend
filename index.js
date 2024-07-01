const express = require('express');

// Initialize express instance
const app = express();

app.get('/', (request, response) =>
    response.send('Welcome to fast food backend!')
);

// handle unknown routes
app.all('*', (request, response) =>
    response.status(404).send('Resource not found.')
);

const port = process.env.PORT || 8000;
app.listen(port, () => console.info(`Server up and running on port ${port} !`));
