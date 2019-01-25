const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/user"
router.route("/login")
  .get(usersController.findAll)
  .post(usersController.create);

// Matches with "/api/user/:id"
router
  .route("/login/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
