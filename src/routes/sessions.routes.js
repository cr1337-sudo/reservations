const router = require("express").Router()
const sessionsCtr = require("../controllers/sessions.controllers")

router.get("/", sessionsCtr.getSessions)
router.post("/", sessionsCtr.createSession)
router.delete("/:dayId/:sessionId", sessionsCtr.deleteSession)


module.exports = router;

