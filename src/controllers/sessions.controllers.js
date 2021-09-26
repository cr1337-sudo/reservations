const Session = require("../models/Session");
const Day = require("../models/Day");

//month,year,day,hour(str),name,number,jobs[]
const createSession = async (req, res) => {
  const { year, month, day, hour, name, number, jobs } = req.body;
  const sessionDay = new Session(req.body);
  const dayChange = await Day.findOneAndUpdate(
    { year, month, day, "hours.hour": hour },
    {
      $set: {
        "hours.$.available": true,
      },
    },
    {
      new: true,
    }
  );
  //res.json(sessionDay);
  res.json(dayChange);
};

module.exports = { createSession };
