const router = require("express").Router()
const sessionsCtr = require("../controllers/sessions.controllers")

router.post("/", sessionsCtr.createSession)

module.exports = router;

