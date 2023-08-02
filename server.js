// Imports Express.js
const express = require('express');

// Imports built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Imports the notes router
const api = require('./develop/routes/index');

// add console log middleware
const { clog } = require('./develop/middleware/clog');

// Sets port equal to whatever is in the environmental variable port, or port 3001 if not available
const PORT = process.env.port || 3001;

// Initializes an instance of Express.js
const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// HTML GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/develop/public/notes.html'))
);

// HTML Wildcard route for homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/develp'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
