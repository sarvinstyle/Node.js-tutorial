const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses-controller");
const auth = require("../middelwares/auth")



router.get("/:id", coursesController.getCourse);

router.get("/",   coursesController.getCourses);

router.use(auth)
router.post("/", coursesController.insertCourse);

router.put("/:id", coursesController.updateCourse);

router.delete("/:id", coursesController.deleteCourse);

module.exports = router;
