const express = require('express');
const path = require('path');
const app = express();
const notesData = require('./db/db.json');
const fs = require('fs');
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');



const PORT = 3001;


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json')
        .then((dataBuffer) => {
            let data = dataBuffer.toString();
            res.json(JSON.parse(data))
        })

});

app.post('/api/notes', (req, res) => {

    readAndAppend(req.body, './db/db.json')
    res.send();
})




app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);