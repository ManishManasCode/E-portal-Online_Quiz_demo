const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const express = require("express");
const upload = multer({ dest: "uploads/" });
const fileupload = require("express-fileupload");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());
/*Routes */

app.use(express.static(__dirname + "/e-exam/New folder"));
app.use("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/index.html"));
});

app.use(express.static(__dirname + "/e-exam/New folder/login"));
app.use("/reg", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/reg/reg.html"));
});

app.use(express.static(__dirname + "/e-exam/New folder/reg"));
app.use("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/login/login.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/ques"));
app.use("/quiz", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/e-exam/New folder/ques/q1.html"));
});
app.get("/exam", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/exam/home.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/open forum"));
app.use("/forum", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/open forum/index.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/e-repo"));
app.use("/repo", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/e-repo/index.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/my-wal"));
app.use("/mywall", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/my-wal/index.html"));
});
app.use(express.static(__dirname + "/e-exam/New folder/vault"));
app.use("/vault", (req, res) => {
  res.sendFile(path.join(__dirname, "e-exam/New folder/vault/index.html"));
});

/*APis*/

app.post("/api/login", (req, res, next) => {
  console.log(req.body);
  // res.send('hello');
});
app.post("/api/reg", (req, res, next) => {
  console.log(req.body);
});
app.post("/api/file", (req, res, next) => {
  console.log("called");
  const samplefile = req.files.file;
  console.log(samplefile);
  uploadPath = __dirname + "/uploads/" + samplefile.name;
  samplefile.mv(uploadPath, function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("success");
  });
});

app.listen(5000);
