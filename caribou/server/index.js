"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  logIn,
  addUser,
  addHuman,
  removeHuman,
  seeHumans,
} = require("./handlers");

const PORT = 4000;

const app = express();

app
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
  })

  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //ENDPOINTS
  .get("/humans", seeHumans)
  .post("/login", logIn)
  .post("/adduser", addUser)
  .post("/addhuman", addHuman)
  .delete("/deletehuman", removeHuman)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
