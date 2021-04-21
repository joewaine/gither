const express = require("express");
const router = express.Router();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept");
    //   next();

// intercept OPTIONS method
if ('OPTIONS' == req.method) {
    res.send(200);
} else {
    next();
}

  });

const tockController = require("../controller/tockController");

router.get('/mongotock', tockController.mongoTock);
router.post('/removealltocks', tockController.removeAllTocks);
router.post('/updatetockofferings', tockController.updateTockOfferings);

//gets tock and puts it into local storage
router.get('/tockmeals/:id', tockController.tockMeals);
router.post('/tocktomongo', tockController.tockToMongo);




router.get('/tockfrommongo', tockController.tockFromMongo);

module.exports = router;




