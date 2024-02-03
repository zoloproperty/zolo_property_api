const Response = require("../helper/static/Response");
const {
  interaction_list,
  interaction_update,
  interaction_delete,
  interaction_add,
} = require("../models/interactionModal");

const { extractRequestData } = require("../helper/static/request-response");

exports.list = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await interaction_list(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.add = async (req, res) => {
  try {
    const postData = req.body;
    const response = await interaction_add(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.update = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await interaction_update(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await interaction_delete(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};