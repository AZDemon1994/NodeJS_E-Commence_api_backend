const router = require("express").Router();
const controller = require("../controllers/user");
const { UserSchema } = require("../utils/schema");
const { validateBody, validateToken, validateRole } = require("../utils/validator");

router.post("/register", [controller.register]);
router.post("/login", [controller.login]);

router.post("/add/Role", [validateToken, validateRole("Owner"), validateBody(UserSchema.addRole), controller.addRole]);
router.post("/remove/Role", [validateToken, validateRole("Owner"), validateBody(UserSchema.addRole), controller.removeRole]);

router.post("/add/Permit", [validateToken, validateRole("Owner"), validateBody(UserSchema.addPermit), controller.addPermit]);
router.post("/remove/Permit", [validateToken, validateRole("Owner"), validateBody(UserSchema.addPermit), controller.removePermit]);


module.exports = router;