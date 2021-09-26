const Job = require("../models/Job");

const createJob = async (req, res) => {
  const newJob = Job(req.body);
  try {
    const savedJob = await newJob.save();
    res.json(savedJob);
  } catch (e) {
    res.json("Error saving the job...");
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (e) {
    res.json(e);
  }
};

const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.json({
      tatus: "Ok",
      deletedJob,
    });
  } catch (e) {
    res.json("Invalid id");
  }
};

const udpateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(job);
  } catch (e) {
    res.json("Error");
  }
};
module.exports = { createJob, getJobs, deleteJob, udpateJob };
