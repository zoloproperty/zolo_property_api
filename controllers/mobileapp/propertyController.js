const Response = require("../../helper/static/Response");
const {
  model_count_total,
  model_list_all,
  model_list_all_by_Time,
  user_property
} = require("../../models/propertyModal");


exports.countAll = async (req, res) => {
  try {
    const response = await model_count_total();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};


exports.getAll = async (req, res) => {
  try {
    const response = await model_list_all();
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};


exports.getAllByTime = async (req, res) => {
  try {
    const response = await model_list_all_by_Time(new Date(req.params.time));
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};


exports.getAllRecommendation = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await model_list_ids(postData);

    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.getMyPropertyIds = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await user_property(postData);

    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};


exports.getAppVersion =  async (req, res) => {
  try {
    return new Response(200, "T", {version: process.env.APP_VERSION}).custom(
      "App version get successfully"
    );
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

