const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tanishq$12',
  database: 'flashcard_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
    db.query('SELECT * FROM flashcards', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Add a new flashcard
  app.post('/api/flashcards', (req, res) => {
    const { question, answer } = req.body;
    db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err) => {
      if (err) throw err;
      res.status(201).send('Flashcard added');
    });
  });
  
  // Update a flashcard
  app.put('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err) => {
      if (err) throw err;
      res.send('Flashcard updated');
    });
  });
  
  // Delete a flashcard
  app.delete('/api/flashcards/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM flashcards WHERE id = ?', [id], (err) => {
      if (err) throw err;
      res.send('Flashcard deleted');
    });
  });
  

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
