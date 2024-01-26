const Response = require("../helper/static/Response");
const {login , saveUser ,user_list, user_delete} = require("../models/userModels");

const { extractRequestData } = require("../helper/static/request-response");

exports.list = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await user_list(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};
exports.login = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      console.log(postData ,"postData")
      const response = await login(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  
  exports.saveUser = async (req, res) => {
    try {
      const postData = (req.body);
      const response = await saveUser(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  exports.delete = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await user_delete(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  