const router = require("express").Router()
const daysCtr = require("../controllers/days.controllers")

router.post("/", daysCtr.createDay)
router.get("/", daysCtr.getDay)
router.delete("/:id", daysCtr.deleteDay)
module.exports = router;
