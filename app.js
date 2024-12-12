require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// post routes
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser({}));

app.use(express.static("static"));
app.use(fileUpload({}));
// routes
app.use("/api/post/", require("./router/post.router"));
app.use("/api/auth/", require("./router/auth.router"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT);

const bootstrap = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then(() => {
      console.log("Connect db");
    });
  } catch (error) {
    console.log(`Error connecting with DB: ${error}`);
  }
};

bootstrap();
