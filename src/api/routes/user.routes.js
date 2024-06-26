const router = require('express').Router();
// const { AuthMiddleware } = require('../middlewares');
const { UserController } = require('../controllers');

router.get("/get", UserController.retrieveUsers);

router.post("/postData", UserController.postUsers);

router.get("/view/:id", UserController.getUserById);

router.post("/postUpdate/:userId", UserController.postUsersUpdate);

module.exports = router;