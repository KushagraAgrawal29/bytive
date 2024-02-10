const express = require("express");
const app = express();

const database = require("./config/database");

const userRouter = require("./routes/user");

const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(
  cors({
    //making backend to entertain frontend requests
    origin:"http://localhost:3000",
    credentials:true,
  })
)

//routes
app.use("/api/v1/user",userRouter);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Your server is running",
  });
});

app.listen(PORT, () => {
  console.log(`Your app is running at ${PORT}`);
});
