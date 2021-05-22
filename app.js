const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRouter)
app.use("/api/contacts", contactsRouter)


app.use((_req, res) => {
  res.status(404).json({ 
    status: "Error", 
    code: 404, 
    message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({
    status: "Error",
    code: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
