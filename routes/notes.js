// import express router
const router = require("express").Router();
// import helper functions
const { readFromFile, readAndAppend, writeToFile } = require("../lib/fsUtils");
// import uuid
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
router.get("/", async (req, res) => {
    console.info(`${req.method} request received for notes`);
    const data = await readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    return data;
}
);

// GET Route for a specific note
router.get("/:id", async (req, res) => {
    console.info(`${req.method} request received for a specific note`);
    const data = await readFromFile("./db/db.json").then((data) => JSON.parse(data));
    const result = data.filter((note) => note.id === req.params.id);
    return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
});

// POST Route for a new note
router.post("/", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added successfully`);
    } else {
        res.error("Error in adding note");
    }
});

// DELETE Route for a specific note
router.delete("/:id", async (req, res) => {
    console.info(`${req.method} request received to delete a note`);
    const data = await readFromFile("./db/db.json").then((data) => JSON.parse(data));
    const result = data.filter((note) => note.id !== req.params.id);
    writeToFile("./db/db.json", result);
    res.json(`Note deleted successfully`);
});

// export router
module.exports = router;
