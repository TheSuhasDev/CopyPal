const express = require("express");
const router = require("./routes/router");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5500;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((e) => {
    console.log(e);
  });

  app.use(
    cors({
      origin: 'http://localhost:5173',  
      methods: ['GET', 'POST', 'DELETE', 'PUT'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
      credentials: true,
    })  
  );

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
