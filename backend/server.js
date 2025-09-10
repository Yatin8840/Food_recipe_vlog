
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
connectDb();

// ✅ Allowed frontend URLs from .env
const allowedOrigins = [process.env.FRONTEND_URL_LOCAL];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.static("public"));

app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, (err) => {
  console.log(`app is listening on port ${PORT}`);
});
