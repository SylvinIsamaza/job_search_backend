const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require('./db/db')
const cors=require("cors")

const router = require("./routes/user");

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

db()
app.listen(6764, () => {
  console.log("listening on port 6764");
});
