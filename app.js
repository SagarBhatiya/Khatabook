const express = require("express");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const hisaabPath = path.join(__dirname, "hisaab");

if (!fs.existsSync(hisaabPath)) {
  fs.mkdirSync(hisaabPath, { recursive: true });
}
app.get("/", (req, res) => {
  fs.readdir(`./hisaab`, function (err, files) {
    if (err) return res.status(500).send(err);
    res.render("index", { files: files });
  });
});

app.get("/create", function (req, res) {
  res.render("create");
});

app.get("/edit/:filename", function (req, res) {
  fs.readFile(`./hisaab/${req.params.filename}`, "utf8", function (err, data) {
    if (err) return res.status(500).send(err);
    res.render("edit", { filename: req.params.filename, data });
  });
});

app.get("/hisaab/:filename", function (req, res) {
  fs.readFile(`./hisaab/${req.params.filename}`, "utf-8", function (err, data) {
    if (err) return res.status(500).send(err);
    res.render("hisaab", { data, filename: req.params.filename });
  });
});

app.get("/delete/:filename", function (req, res) {
  fs.unlink(`./hisaab/${req.params.filename}`, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

app.post("/update/:filename", function (req, res) {
  fs.writeFile(
    `./hisaab/${req.params.filename}`,
    req.body.hisaab,
    function (err) {
      if (err) return res.status(500).send(err);
      res.redirect("/");
    }
  );
});

app.post("/createhisaab", function (req, res) {
  var date = new Date();
  var filename = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
  fs.writeFile(`./hisaab/${filename}`, req.body.content, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});
app.listen(3000);
