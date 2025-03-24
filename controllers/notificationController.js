const Response = require("../helper/static/Response");
const { notification_upsert, allForAProperty,  deleteAllForAProperty , getMyNotification} = require("../models/notificationModal");

const { extractRequestData } = require("../helper/static/request-response");


exports.upsert = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await notification_upsert(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };

  exports.getAllForProperty = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await allForAProperty(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  

  
  exports.getMyNotification = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await getMyNotification(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  
  
  
  exports.deleteAllForAProperty = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await deleteAllForAProperty(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  