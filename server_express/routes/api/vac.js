var express = require('express');
var router = express.Router();
const vacationsController = require("../../controllers/vacationsController");
const authMiddleware = require("../../middlewares/authMiddleware");


/* GET all vacations. */
router.get('/all/:userID', [authMiddleware.isLogin], vacationsController.getAll);
/* GET only followed vacations for Reports. */
router.get('/onlyFollowed', [authMiddleware.isAdmin], vacationsController.getFollowdvacationsForReports);
/* GET single vacation. */
router.get('/:id', [authMiddleware.isAdmin], vacationsController.getSingleVacation);
/* POST new vacation. */
router.post('/addNew', [authMiddleware.isAdmin], vacationsController.add);
/* PUT update vacation. */
router.put('/update', [authMiddleware.isAdmin], vacationsController.update);
/* DELETE vacation. */
router.delete('/:id', [authMiddleware.isAdmin], vacationsController.delete);


module.exports = router;
