const express = require("express");
const app = express();

const topicsRouter = require("./routes/routes");

app.use("/api/topics", topicsRouter);
