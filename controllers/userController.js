const Response = require("../helper/static/Response");
const userModel = require("../models/userModels");

const { extractRequestData } = require("../helper/static/request-response");


exports.login = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await userModel.login(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  
  exports.saveUser = async (req, res) => {
    try {
      const postData = extractUser(req);
      const response = await userModel.saveUser(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  