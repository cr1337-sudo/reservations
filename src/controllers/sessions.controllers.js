const mongoose = require("mongoose");
const Session = require("../models/Session");
const Day = require("../models/Day");

// params: month, year, day, id
const getSessions = async (req, res) => {
  const sessions = await Session.find(req.query);
  res.json(sessions);
};

//month,year,day,hour(str),name,number,jobs[]
const createSession = async (req, res) => {
  const { year, month, day, hour, name, number, jobs } = req.body;
  if (year && month && day && hour && name && number && jobs) {
    try {
      const dayInMonth = await Day.findOne({
        year,
        month,
        day,
        "hours.hour": hour,
        "hours.available": true,
      });

      if (!dayInMonth) {
        const creatingDay = new Day({ year, month, day });
        await creatingDay.save();
        res.json({ data: "Day created, resend the method" });
      }

      const availableDay = dayInMonth.hours.filter(
        (day) =>
          day.available === true &&
          day.sessionData.length === 0 &&
          day.hour === hour
      );

      if (availableDay.length !== 0) {
        const sessionDay = new Session({ dayId: dayInMonth._id, ...req.body });
        const savedSessionDay = await sessionDay.save();
        const { _id } = savedSessionDay;

        await Day.findOneAndUpdate(
          { year, month, day, "hours.hour": hour },
          {
            $set: {
              "hours.$.available": false,
              "hours.$.sessionData": { name, number, jobs, sessionId: _id },
            },
          },
          {
            new: true,
          }
        );
        res.json(savedSessionDay);
      } else {
        return res.json("That hour is already taken");
      }
    } catch (e) {
      res.json("Invalid data");
    }
  }
};

const deleteSession = async (req, res) => {
  try {
    const { dayId, sessionId } = req.params;
    const deletedSession = await Session.findByIdAndDelete(sessionId);
    if (deletedSession) {
      const dayToUpdate = await Day.findOneAndUpdate(

        { _id: dayId, "hours.sessionData.sessionId": mongoose.Types.ObjectId(sessionId) },
        {
          "hours.$.sessionData":[],
          "hours.$.available":true
        },{
          new:true
        }
             );

      res.json(dayToUpdate);
    }
  } catch (e) {
    res.json("Invalid session id");
  }
};


module.exports = { getSessions, createSession, deleteSession };
