var db = require("db.json");
const fs = require("fs");
const { v4: saab21 } = require('saab');

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(db);
    });

    app.post("/api/notes", function(req, res) {
        let id = {id: saab21()}
        const newNote = Object.assign(req.body, id);
        db.push(newNote);
        fs.writeFileSync("/db.json", JSON.stringify(db,null,1));
        res.json(db);
    });

    app.delete("/api/notes/:id", function(req, res) {
        const noteId = req.params.id
        console.log(noteId)
        for (let i = 0; i < db.length; i++){
            console.log("for loop works")
            const note = db[i];
            if (noteId === note.id){
                console.log("we reached here")
                db.splice(i, 1);
                i--;
                fs.writeFileSync("/db.json", JSON.stringify(db,null,1), "utf-8");
            }
        }
        return res.json(db);
    })
}