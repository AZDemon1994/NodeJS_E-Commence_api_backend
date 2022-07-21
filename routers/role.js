const router = require("express").Router();
const controller = require("../controllers/role");
const { RoleSchema, AllSchema } = require("../utils/schema");
const { validateBody, validateParams, validateToken } = require("../utils/validator");

router.route("/")
    .get(validateToken, controller.all)
    .post(validateBody(RoleSchema.add), validateToken, controller.add)

router.route("/:id")
    .get(validateParams(AllSchema.id, "id"), validateToken, controller.get)
    .patch(validateParams(AllSchema.id, "id"), validateToken, controller.patch)
    .delete(validateParams(AllSchema.id, "id"), validateToken, controller.drop)

router.post("/add/permit", [validateBody(RoleSchema.addPermit), validateToken, controller.roleAddPermit]);
router.post("/remove/permit", [validateBody(RoleSchema.addPermit), validateToken, controller.roleRemovePermit]);

module.exports = router;