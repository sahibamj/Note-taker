const { notStrictEqual } = require("assert");
var express = require("express");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 7000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/add")(app);
require("./routes/html")(app);



app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  app.post("api/notes", function(req, res) {
      var activeNote = req.body;
      activeNote.routeName = activeNote.name.replace(/\s+/g, "").toLowerCase();
      console.log(activeNote);
      notStrictEqual.push(activeNote);
      res.json(activeNote);
  });

  
app.listen(PORT, function() {
    console.log("i think it's working now " + PORT);
});