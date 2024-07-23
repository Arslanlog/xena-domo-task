const router = require("express").Router();
const { ROUTES } = require("../constants");
const { user, transaction } = require("../controller");

router.use(ROUTES.USER, user);
router.use(ROUTES.TRANSACTION, transaction);

module.exports = router;