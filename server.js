const express = require('express');
const path = require('path');
const app = express();
const notesData = require('./db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const userId = uuidv4();
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((dataBuffer) => {
            let data = dataBuffer.toString();
            res.json(JSON.parse(data))
        });
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((notes) => {
            const result = notes.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
            res.send();
        });
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, './db/db.json')
        res.send();
    } else {

    };
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);