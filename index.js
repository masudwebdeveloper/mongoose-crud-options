const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoHandler = require("./todoHandler/todoHandler");
const port = process.env.PORT || 5000;

//express app initialization
const app = express();
app.use(express.json());

//middleware
app.use(cors());

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/todos");
    console.log("mongodb connected successfull");
    app.listen(port, () => {
      console.log(`mongoose server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(err => console.log(err));

app.use("/todo", todoHandler);
app.get('/', (req, res)=>{
  res.status(200).json({message: "server is running"});
})

// mongoose.connect(
//   "mongodb+srv://abdullainfo30:Yg0HXaQd8BDlKFGv@portfolio.e4maybu.mongodb.net/"
// );
