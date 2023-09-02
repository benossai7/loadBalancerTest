// dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const session = require("express-session");
require("dotenv").config();



// Application logic start
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// configure cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Accss-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// express session
app.use(
  session({
    secret: "process.env.EXPRESS_SESSION_SECRET_KEY",
    resave: true,
    saveUninitialized: true,
  })
);
// express messages
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});


// projects routes
// app.use("/register", RegisterRoute);
app.get("/", (req,res)=>{
  res.json("Droplet 1")
})

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
// Application logic end
// export appliction logic
module.exports = app;
// app.listen(3000);
