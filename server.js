const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const Book = require("./Models/Book").default;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const axios = require("axios");

const pg = require("pg");
require("dotenv").config();

const client = new pg.Client(process.env.DATABASE_URL);
global.DBclient = client;

app.use(express.static("public"));

app.set("view engine", "ejs")

// cors origin
app.all("*", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, HEAD, PUT, PATCH, POST, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// main
app.get("/", (req, res) => {
  res.status(200).render("pages/index");
});

app.get("/searches/new", (req, res) => {
  res.status(200).render("pages/searches/new");
});

app.post("/searches", (req, res, next) => {
  const {input, titleOrAuthor} = req.body;
  if (!input) return next(new Error("no Search input"));
  let link = "https://www.googleapis.com/books/v1/volumes?q=";
  link += `in${titleOrAuthor}:${input}`;

  axios.get(encodeURI(link))
    .then((result) => {
      const books = result.data.items.map((item) => new Book(item));
      res.status(200).render("pages/searches/show", { books });
    }).catch((e) => next(e));

});

// page not found middleware
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Sorry, page not found !" });
})


// error middleware
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).render("pages/error", {error: err});
});

const PORT = process.env.PORT || 3000;

client.connect()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`listening on ${PORT}`)
    );
  }).catch((err) => {
    console.log(err.message);
  });
