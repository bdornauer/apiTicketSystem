const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "susi.gustavson@gmail.com",
    pass: "susi1234!!!",
  },
});

function emailTemplate(job) {
  let descriptionLevel ="";
  switch (job.supportLevel) {
    case 1: descriptionLevel = "Wenig"; break;
    case 2: descriptionLevel = "Mittel"; break;
    case 3: descriptionLevel = "Schwer"; break;
  }

  let description =  `
  <h1>Some work todo</h1>
  <ul>`+
  `<li><b>Id:</b> `+ job.id + `</li>`+ 
  `<li><b>Von:</b> `+ job.name + `</li>`+ 
  `<li><b>Raum:</b> `+ job.room + `</li>`+ 
  `<li><b>Beschreibung:</b> `+ job.description + `</li>`+ 
  `<li><b>Wichtigkeit:</b> `+ descriptionLevel + `</li>`+
  `<li><b>Datum:</b> `+ job.date + `</li>`+
  `</ul>`;

  return({
    from: "susi.gustavson@gmail.com",
    to: "benedikt.dornauer@outlook.at",
    subject: "New job todo",
    html: description,
  });
}

module.exports = {
  sendJob: function (job) {
    transporter.sendMail(emailTemplate(job), function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};