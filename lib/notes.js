// set up dependencies
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

// note filter
function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
        filteredResults = filteredResults.filter(
            (note) => note.title === query.title
        );
    }
    if (query.id) {
        filteredResults = filteredResults.filter(
            (note) => note.id === query.id
        );
    }
    return filteredResults;
}

// find notes by ID
function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

// create new notes
function createNewNote(body, notesArray) {
    const note = body;
    note.id = uuid();
    notesArray.push(note);
    saveNotes(notesArray);
    return note;
}

// save the note
function saveNotes(notesArray) {
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
}

// note validation
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// note deletion
function deleteNote(id, notesArray) {
    notesArray = notesArray.filter(note => note.id !== id);
    saveNotes(notesArray);
    return notesArray;
}

module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote,
};