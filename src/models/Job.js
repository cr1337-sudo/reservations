const { model, Schema } = require("mongoose");

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
});

module.exports = model("Job", JobSchema);
