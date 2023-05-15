const { Schema, model } = require("mongoose");

const todoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

//instance methods
todoSchema.methods.findActive = function () {
  return model("Todo").find({ status: "inactive" });
};

//statics methods
todoSchema.statics = {
  findByJs: function(){
    return this.find({title: /js/i})
  }
}

module.exports = todoSchema;
