const express = require("express");
const router = express.Router();
//we are get an todo model
const todoSchema = require("../schemas/todoShema");
const { model } = require("mongoose");
const Todo = new model("Todo", todoSchema);

//get all the todos
router.get("/", async (req, res) => {
  await Todo.find({ status: /active/i }, "status title")
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
  //
});

//get all the todos
router.get("/alls", (req, res) => {
  Todo.find({}, (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(data);
    }
  });
});

//get all active todos
router.get("/inactive", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({ data });
});

//get all include js file in todos
router.get("/js", async (req, res) => {
  const data = await Todo.findByJs();
  res.status(200).json({ data });
});

//get a todo
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.find({ _id: id });
  res.status(200).json({ data: todo });
});

// post a todo
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.status(200).json({ status: "done" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//post multiple todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body);
  res.status(200).json({ message: "many data insert successfull" });
});

// a todo update
router.put("/:id", async (req, res) => {
  const result = await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status: "inactive",
      },
    },
    { new: true, upsert: false }
  );
  res.status(200).json({ message: "successfull", data: result });
  console.log(result);
});

// delete a todo
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Todo.deleteOne({ _id: id });
  res.status(200).json({ data: result });
});

module.exports = router;
