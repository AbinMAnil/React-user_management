const express = require("express");
const app = express();
const mongoose = require("mongoose");
const createError = require("http-errors");
const cors = require("cors");
const bodyParser = require("body-parser");
//cookie and session
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "PATCH", , "DELETE", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

const userManage = require("./routers/userManagement");
const adminMange = require("./routers/adminManagement");

app.use("/api/admin", adminMange);
app.use("/api/user", userManage);
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.send(err);
});

// connect to mongodb atles
mongoose
  .connect("mongodb://localhost:27017/userAdmin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("databse connected  sucesssufully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => console.log("server connected"));
