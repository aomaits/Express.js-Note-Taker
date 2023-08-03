const express = require('express');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
const noteData = require('./db/notes.json');
const fs = require('fs');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// localhost:3001/api/
// app.use('/api', apiRoutes);
app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text} = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        // res.status(201).json(response);
        
        // Obtain existing reviews
        fs.readFile('./db/notes.json', 'utf8', (err, data) => {
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data);

            // Add a new review
            parsedNotes.push(newNote);
            console.log(parsedNotes);

          // Write updated notes back to the file
        fs.writeFile('./db/notes.json', JSON.stringify(parsedNotes, null, 4), (writeErr) =>
            writeErr ? console.error(writeErr) : console.info('Successfully updated notes!'));
        });




//  MORNING OBJECTIVES!!! (1) Try getting the db NOTES.JSON to write correctly to the Note Taker page (API route from the server to the client side...would this be a POST request?) (2) Try to modularize routing? Maybe in office hours? 






    } else {res.status(500).json('Error in posting note');}
});

// localhost:3001/
app.use('/', htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));