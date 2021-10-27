const router = require("express").Router();
const userCtr = require("../controllers/users.controllers");
const verifyToken = require("../utils/verifyToken");

//UPDATE
router.put("/:id", verifyToken, userCtr.updateUser);
//DELETE
router.delete("/:id", verifyToken, userCtr.deleteUser);
//GET
router.get("/find/:id",verifyToken, userCtr.getUser);
//GET ALL
router.get("/", verifyToken, userCtr.getAllUsers);

module.exports = router;
