const Day = require("../models/Day");

const createDay = async (req, res) => {
  const { year, month, day } = req.body;
  try {
    const checkDayExists = await Day.findOne({ year, month, day });

    if (checkDayExists) return res.json("Day already created!");

    const newDay = new Day({ year, month, day });
    const savedDay = await newDay.save();
    res.json(savedDay);
  } catch (e) {
    res.json("Error during the day creation");
  }
};

const getDay = async (req, res) => {
  //year month day por parametros
  const days = await Day.find(req.query);
  if (days.length === 0) return res.json(await Day.find({year:1, month:1, day:1}));
  res.json(days);
};

//This will delete the whole day info
const deleteDay = async (req, res) => {
  try {
    const deletedDay = await Day.findByIdAndDelete(req.params.id);
    res.json(deletedDay);
 } catch (e) {
    res.json("Error");
  }
};

module.exports = {
  createDay,
  getDay,
  deleteDay,
};
