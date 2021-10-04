const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
// Rutas
const jobsRoutes = require("./routes/jobs.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const daysRoutes = require("./routes/days.routes");

//Middlewares
require("dotenv").config();
app.use(express.json());

//Database
require("./database");

//use routes
app.use("/api/jobs", jobsRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/days", daysRoutes);

app.listen(port, () => {
  console.log("Server running at port " + port);
});

