console.log("USING THIS SERVER.JS FILE");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
let threats = [];
app.get("/", (req, res) => {
    res.send("Welcome to Aegis Threat Manager Backend!");
});
app.get("/test", (req, res) => {
    res.send("TEST ROUTE");
});

app.get("/threats", (req, res) => {
    console.log("GET /threats route hit");
    res.json(threats);
});
app.post("/threats", (req, res) => {

    const threat = {
        id: threats.length + 1,
        threatName: req.body.threatName,
        severity: req.body.severity,
        category: req.body.category
    };

    threats.push(threat);
    res.json(threat);
    
});
app.get("/threats", (req, res) => {
    res.json(threats);
});
    
app.get("/threats/:id", (req, res) => {

    const id = Number(req.params.id);

    const threat = threats.find(t => t.id === id);

    if (!threat) {
        return res.status(404).send("Threat not found");
    }

    res.json(threat);

});


app.put("/threats/:id", (req, res) => {
    

    const id = Number(req.params.id);

    const threat = threats.find(t => t.id === id);

    if (!threat) {
        return res.status(404).send("Threat not found");
    }

   threat.threatName = req.body.threatName;
threat.severity = req.body.severity;
threat.category = req.body.category;


    res.json(threat);
});
app.delete("/threats/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = threats.findIndex(t => t.id === id);
    if (index === -1) {
    return res.status(404).send("Threat not found");
}
 const deletedThreat = threats.splice(index, 1);

    res.json({
        message: "Threat deleted successfully",
        deleted: deletedThreat[0]
    });

});
app.get("/test", (req, res) => {
    res.send("TEST ROUTE WORKING");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


