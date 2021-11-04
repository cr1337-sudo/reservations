const mongoose = require("mongoose");
const Session = require("../models/Session");
const Day = require("../models/Day");

// params: month, year, day, id
const getSessions = async (req, res) => {
  const sessions = await Session.find(req.query);
  res.json(sessions);
};

//month,year,day,hour(str),name,number,jobs[], note
const createSession = async (req, res) => {
  const { year, month, day, hour, name, email, jobs } = req.body;
  if (year && month && day && hour && name && email && jobs) {
    try {
      const dayInMonth = await Day.findOne({
        year,
        month,
        day,
        "hours.hour": hour,
        "hours.available": true,
      });

      const availableDay = dayInMonth.hours.filter(
        (day) =>
          day.available === true &&
          day.sessionData.length === 0 &&
          day.hour === hour
      );
      if (availableDay.length != 0) {
        const sessionDay = new Session({ dayId: dayInMonth._id, ...req.body });
        const savedSessionDay = await sessionDay.save();
        const { _id } = savedSessionDay;

        await Day.findOneAndUpdate(
          { year, month, day, email, "hours.hour": hour },
          {
            $set: {
              "hours.$.available": false,
              "hours.$.sessionData": {
                name,
                email,
                jobs,
                sessionId: _id,
                note: req.body.note,
              },
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
        {
          _id: dayId,
          "hours.sessionData.sessionId": mongoose.Types.ObjectId(sessionId),
        },
        {
          "hours.$.sessionData": [],
          "hours.$.available": true,
        },
        {
          new: true,
        }
      );

      res.json(dayToUpdate);
    }
  } catch (e) {
    res.json("Invalid session id");
  }
};

const updateSession = async (req, res) => {
  const { dayId, sessionId } = req.params;
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      {
        $set: req.body,
      },
      { new: true }
    );
    const updatedDay = await Day.findOneAndUpdate(
      {
        _id: dayId,
        "hours.sessionData.sessionId": mongoose.Types.ObjectId(sessionId),
      },
      {
        $set: {
          "hours.$.sessionData": {
            name: updatedSession.name,
            number: updatedSession.number,
            email: updatedSession.email,
            jobs: updatedSession.jobs,
            dayId: updatedSession.dayId,
            note: updatedSession.note,
          },
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedDay);
  } catch (e) {
    res.json("Invalid session id");
  }
};

module.exports = { getSessions, createSession, deleteSession, updateSession };
