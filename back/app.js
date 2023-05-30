
const express = require("express")
 const apiRouter= require("./routes/api")

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
const path = require("path");
// view engine setup
app.use(cors());
// parse request body as JSON
app.use(express.json());

// mount API router
app.use('/api', apiRouter);

// start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
