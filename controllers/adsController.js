const Response = require("../helper/static/Response");
const {
  ads_list,
  ads_update,
  model_one,
  ads_delete,
  ads_add,
  model_list_all_by_Time
} = require("../models/adsModal");

const { extractRequestData } = require("../helper/static/request-response");

exports.list = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await ads_list(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.add = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await ads_add(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.one = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await model_one(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.update = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await ads_update(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};

exports.delete = async (req, res) => {
  try {
    const postData = extractRequestData(req);
    const response = await ads_delete(postData);
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};




exports.getAdsByTime = async (req, res) => {
  try {
    const response = await model_list_all_by_Time(new Date(req.params.time));;
    return res.status(response.status).json(response);
  } catch (error) {
    return res.json(new Response(500, "F").custom(error.message));
  }
};


// Controller agrees to implement the function called "respond"
exports.broadcast = function(socket_io){
  // this function expects a socket_io connection as argument

  // now we can do whatever we want:
  socket_io.on('ads',function(ads){

      // as is proper, protocol logic like
      // this belongs in a controller:

      socket.broadcast.emit(ads);
  });
}