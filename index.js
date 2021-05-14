const express = require("express");
var cors = require("cors");
const fs = require("fs");
const app = express();
const mail = require("./mail.js");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("/jobs", (req, res) => {
    let jobsJson = fs.readFileSync("jobs.json");

    let jobs = JSON.parse(jobsJson);
    res.send(JSON.stringify(jobs));
});

app.get("/", (req, res) => {
    res.send('Backendserver is running.')
});

app.post("/addJob", (req, res) => {
    let jsonData = fs.readFileSync("jobs.json");
    let data = JSON.parse(jsonData);
    let idCounter = data.idCounter;

    let newJob = req.body;
    console.log(newJob);
    newJob.id = idCounter;
    newJob.date = new Date();

    data.jobs.push(newJob);
    data.idCounter += 1;
    mail.sendJob(newJob);
    fs.writeFileSync("jobs.json", JSON.stringify(data));

    res.send("Job received");
});


app.post("/jobDone", (req, res) => {
    let isCorrect = {failure: false};
    let doneJob = req.body;
    let doneJobId = doneJob.id;
    let adminPassword = doneJob.adminPassword;

    if (adminPassword === "1234") {
        console.log("ok");
        let jsonData = fs.readFileSync("jobs.json");
        let data = JSON.parse(jsonData);
        let jobs = data.jobs;
        jobs.forEach(function (job) {
            if (job.id === doneJobId) {
                job.supportLevel = "4";
            }
        });

        fs.writeFileSync("jobs.json", JSON.stringify(data));

        isCorrect.failure = true;
    }
    res.send(JSON.stringify(isCorrect));

})
;




