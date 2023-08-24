// import statements
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");


// set PORT to process.env.PORT or 3001
const PORT = process.env.PORT || 3001;

// create an instance of the express app
const app = express();

// middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use api route
app.use("/api", api);

// serve up static assets
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// GET Route for notes
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET wildcard route for 404 error
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/404.html"))
);

// listener
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);