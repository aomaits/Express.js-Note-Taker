const router = require('express').Router();
const store = require('../db/store');
// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
  store
    .getNotes() //--> this is the custom function you need to write

    
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});