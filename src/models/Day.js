const { model, Schema } = require("mongoose");

const DaySchema = new Schema({
  month: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  hours: {
    type: Array,
    default: [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
    ].map((h) => (h = { hour: h, available: true, sessionData: null })),
  },
});

module.exports = model("Day", DaySchema);
