const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving notes
router.get('/', (req, res) =>
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
router.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, test } = req.body;

  // If all the required properties are present
  if (title && test) {
    // Variable for the object we will save
    const newNote = {
      title,
      test,
      test_id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = router;
