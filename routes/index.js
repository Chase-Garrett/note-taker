// import express
const express = require("express");

// import modules for notes
const notesRouter = require("./notes");

// create an instance of the express app
const app = express();

// use note route
app.use("/notes", notesRouter);

// export app
module.exports = app;