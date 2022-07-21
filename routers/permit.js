const router = require("express").Router();
const controller = require("../controllers/permit");
const { validateBody, validateParams, validateToken } = require("../utils/validator");
const { PermitSchema, AllSchema } = require("../utils/schema");

router.route("/")
    .get(validateToken, controller.all)
    .post([validateBody(PermitSchema.add), validateToken, controller.add])

router.route("/:id")
    .get(validateParams(AllSchema.id, "id"), validateToken, controller.get)
    .patch(validateParams(AllSchema.id, "id"), validateToken, controller.patch)
    .delete(validateParams(AllSchema.id, "id"), validateToken, controller.drop)


module.exports = router;

