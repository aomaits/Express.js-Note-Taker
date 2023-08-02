const notes = require('express').Router();
const { readAndAppend, readFromFile } = require ('../helpers/fsUtils');
// program to add a unique id- built into express? 
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes from the database
notes.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (text && title) {
    // Variable for the object we will save
    const newNote = {
      time: Date.now(),
      text,
      title,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'New note successfully added',
      body: newNote,
    };

    res.json(response);
  } else {res.json('Error in posting note')}
});

module.exports = notes;