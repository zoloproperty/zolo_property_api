const Response = require("../helper/static/Response");
const {
  dashboard_list
} = require("../models/dashboardModal");

exports.list = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await dashboard_list(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};