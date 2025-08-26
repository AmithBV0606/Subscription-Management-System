import express from "express";
import { PORT } from "./config/env.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Management System");
});

app.listen(PORT, () => {
  console.log(
    `Subscription Management System API is running on http://localhost:${PORT}/`
  );
});

export default app;
