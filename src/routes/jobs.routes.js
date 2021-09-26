const router = require("express").Router()
const jobsCtr = require("../controllers/jobs.controllers")

//create job
router.post("/", jobsCtr.createJob)
//get jobs
router.get("/", jobsCtr.getJobs)
//delete job
router.delete("/:id", jobsCtr.deleteJob)
//update job
router.put("/:id", jobsCtr.udpateJob)

module.exports = router;
