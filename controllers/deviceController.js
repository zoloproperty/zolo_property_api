const Response = require("../helper/static/Response");
const { device_upsert ,list, deleteOne, allForAUser, deleteForAllUser } = require("../models/deviceModal");

const { extractRequestData } = require("../helper/static/request-response");

exports.list = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await list(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.upsert = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await device_upsert(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };

exports.deleteOne = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await deleteOne(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  

  exports.deleteByUser = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await deleteForAllUser(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };

  exports.getByUser = async (req, res) => {
    try {
      const postData = extractRequestData(req);
      const response = await allForAUser(postData);
      return res.status(response.status).json(response);
    } catch (error) {
      return res.json(new Response(500, "F").custom(error.message));
    }
  };
  