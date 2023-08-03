const express = require('express');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
const noteData = require('./db/notes.json');
const { readAndAppend } = require('./helpers/fsUtils.js')
const fs = require('fs');
const { v4:uuidv4 } = require('uuid');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// localhost:3001/api/
// app.use('/api', apiRoutes);
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/notes.json', 'utf8', (err, data) => {
        const newNote = JSON.parse(data);

    res.json(newNote)})});

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text} = req.body;

    if (title && text) {
        const addedNote = {
            id: uuidv4(),
            title,
            text
        };
        
        readAndAppend(addedNote, './db/notes.json')

        const response = {
            status: 'success',
            body: addedNote,
        };

        console.log(response);

    return res.status(201).json(response); 

    } else {res.status(500).json('Error in posting note');}

});

// localhost:3001/
app.use('/', htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));