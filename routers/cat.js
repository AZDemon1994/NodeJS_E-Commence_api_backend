const router = require("express").Router();
const controller = require("../controllers/cat");
const { saveFile } = require("../utils/gallery");
const { AllSchema, CatSchema } = require("../utils/schema");
const { validateParams, validateBody, validateToken, validateRole } = require("../utils/validator");

router.route("/")
    .get(controller.all)
    .post(validateToken, validateRole("Owner"), saveFile, validateBody(CatSchema.add), controller.add)

router.route("/:id")
    .get(validateToken, validateRole("Owner"), validateParams(AllSchema.id, "id"), controller.get)
    .patch(validateToken, validateRole("Owner"), validateParams(AllSchema.id, "id"), validateBody(CatSchema.edit), controller.patch)
    .delete(validateToken, validateRole("Owner"), validateParams(AllSchema.id, "id"), controller.drop)

module.exports = router;