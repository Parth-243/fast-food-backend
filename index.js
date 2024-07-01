const express = require('express');

// Initialize express instance
const app = express();

const port = process.env.PORT || 8000;
app.listen(port, () => console.info(`Server up and running on port ${port} !`));
