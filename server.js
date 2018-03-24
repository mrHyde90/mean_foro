const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Post = require("./server/models/post");
const Comment = require("./server/models/comment");
const User = require("./server/models/user");
const postRoutes = require("./server/routes/apiPost");
const ownerRoutes = require("./server/routes/apiOwner");
const commentRoutes = require("./server/routes/apiComment");
const authRoutes = require("./server/routes/apiAuth");
const seedDB = require("./server/seedDB");
const http = require('http');

const url = "mongodb://localhost/mean_foro";
mongoose.connect( process.env.MONGODB_URI || url);
mongoose.Promise = global.Promise;

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CROSS ORIGIN RESOURCES
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//SEEDING DATABASE
//seedDB();

//ROUTES
app.use("/api/post", postRoutes);
app.use("/api/post/:id/comment", commentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/owner", ownerRoutes);

app.get("*", (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

//HAANDLING ERRORS
app.use((req, res, next) => {
  const error = new Error("Not found hermano");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));