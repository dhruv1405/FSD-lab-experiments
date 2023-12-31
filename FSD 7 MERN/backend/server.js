const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 7000;
const routes =require("./routes/ToDoRoutes");

// middle ware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

  app.use("/api", routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
