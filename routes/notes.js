// import express router
const router = require("express").Router();
// import helper functions
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
router.get("/", async (req, res) => {
    console.info(`${req.method} request received for notes`);
    const data = await readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
    return data;
}
);

// POST Route for a new note
router.post("/", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added successfully`);
    } else {
        res.error("Error in adding note");
    }
}
);

// export router
module.exports = router;
