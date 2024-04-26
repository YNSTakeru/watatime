const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");

module.exports = function (app) {
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );
  app.use(express.json());
  app.use(csurf());
};
