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


const productController = require("../controller/productController");
const upserveController = require("../controller/upserveController")
const axios = require('axios');
const bodyParser = require("body-parser");
router.post("/addproduct", productController.addProduct);
// router.get('/allproducts', productController.getProducts);
// router.post('/:id', productController.deleteProduct);


router.get('/upserveolo', upserveController.mamnoonItemsPullMenu);
router.get('/upserveolostreet', upserveController.mamnoonItemsPullMenuStreet);
router.get('/upserveolombar', upserveController.mamnoonItemsPullMenuMbar);





router.get('/newupdateditems', upserveController.upserveMongoRetail);

router.get('/upserve_mongo/:name', upserveController.upserveMongo);

router.post('/shippableedit', upserveController.shippableEdit);

router.post("/retaillbs", upserveController.updateRetailItemLbs);

router.post("/retailoz", upserveController.updateRetailItemOz);

router.post("/retailheight", upserveController.updateRetailItemHeight);
router.post("/retailwidth", upserveController.updateRetailItemWidth);
router.post("/retaillength", upserveController.updateRetailItemLength);
router.post("/retailgirth", upserveController.updateRetailItemGirth);

router.post('/visibleedit', upserveController.visibleEdit);



router.post('/deleteitem', upserveController.deleteItem);

module.exports = router;




