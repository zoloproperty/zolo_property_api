const express = require("express");
const router = express.Router();
const {
  countAll,
  getAll,
  getAllByTime,
  getMyPropertyIds,
  getAllRecommendation,
  getAppVersion
} = require("../controllers/mobileapp/propertyController");

const {
  getAdsByTime
} = require("../controllers/adsController");

const {
  getMyInteractions
} = require("../controllers/interactionController");


const { middleware } = require("../helper/middleware/authentication");

router.get("/propertyCount", middleware, countAll);
router.get("/properties",  middleware, getAll);
router.get("/myproperty",  middleware, getMyPropertyIds);

router.get("/properties/recommendation",  middleware, getAllRecommendation);


router.get("/properties/:time", middleware,  getAllByTime);
router.get("/ads/:time", middleware, getAdsByTime);
router.get("/myinteractions", middleware, getMyInteractions);
router.get("/app-version", middleware, getAppVersion);


module.exports = router;
