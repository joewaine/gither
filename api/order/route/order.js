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


const orderController = require("../controller/orderController");
const axios = require('axios');
const bodyParser = require("body-parser");


var jsonParser = bodyParser.json()


router.post("/addorder", orderController.addOrder);
// router.get('/allorders', orderController.getOrders);
// router.post('/:id', orderController.deleteOrder);
router.get("/email/:email", orderController.retrieveOrders);
router.get("/orderhistory", orderController.allOrders)
router.post("/issue-tokenized-return", orderController.tokenizedReturn)
router.post("/issue-void", orderController.issueVoid)
router.post("/mark-as-shipped", orderController.markAsShipped)
router.get("/polling-request", orderController.pollingRequest)
router.post("/start-transaction", orderController.startTransaction)
router.post("/start-transaction-retail", orderController.startTransactionRetail)

router.post("/void-transid", orderController.voidByTransID)


router.post("/update-refunded-items", orderController.updateRefundItems);

router.post("/usegiftcard", orderController.useGiftCard);
router.post("/lookupgiftcard", orderController.lookUpGiftCard);

router.post("/start-credit-save", orderController.startCreditSave)
// retrieveOrders
// .header("Access-Control-Allow-Origin", "*");

module.exports = router;



