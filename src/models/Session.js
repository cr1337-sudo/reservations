const { Schema, model } = require("mongoose");

const SessionSchema = new Schema(
  {
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    hour: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    jobs: {
      type: Array,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    dayId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Session", SessionSchema);
