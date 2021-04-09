require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `This app is service user for coffee apps listen on port ${PORT}`
  );
});
