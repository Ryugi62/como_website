require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/dist"));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use(
  "/api",
  (req, res, next) => {
    console.log("API request received");
    next();
  },
  userRoutes
);

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
