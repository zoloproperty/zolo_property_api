const Device = require("../Schema/deviceSchema");
const Response = require("../helper/static/Response");
const { UpdateRecordById, AddRecord } = require("../utils/utils");
const { addValidation } = require("../validation-schema/deviceValidation");
const mongoose = require("mongoose");

// ################################################
// #               Ads Add                        #
// ################################################

exports.device_upsert = async (postData) => {
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);
  const userData = postData.authData;
  const existing = await Device.findOne({
    user: userData.user_id, // userId is the user's ObjectId or string id
    $or: [{ name: postData.name }, { deviceId: postData.deviceId }],
  });
  if (existing) {
    existing.deviceId = postData.deviceId;
    existing.name = postData.name;
    existing.is_active = postData.is_active ?? true;
    existing.user = new mongoose.Types.ObjectId(userData.user_id);
    // update
    return await UpdateRecordById(
      Device,
      existing,
      addValidation,
      "DEVICE_UPDATED"
    );
  } else {
    const newId = {};
    newId.deviceId = postData.deviceId;
    newId.name = postData.name;
    newId.is_active = postData.is_active ?? true;
    newId.user = new mongoose.Types.ObjectId(userData.user_id);
    return await AddRecord(
      Device,
      newId,
      {
        user: userData.user_id, // userId is the user's ObjectId or string id
        $or: [{ name: postData.name }, { deviceId: postData.deviceId }],
      },
      addValidation,
      "DEVICE_ADDED"
    );
  }
};

exports.allForAUser = async (postData) => {
  try {
    const removeKey = ["host", "authorization"];
    removeKey.map((key) => delete postData[key]);
    const userData = postData.authData;

    const devices = await Device.find({ user: userData.user_id }).select(
      "name"
    ); // Find all devices for the user

    return new Response(200, "T", { devices }).custom(
      "found one device successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.deleteForAllUser = async (postData) => {
  try {
    const removeKey = ["host", "authorization"];
    removeKey.map((key) => delete postData[key]);
    const userData = postData.authData;

    const result = await Device.deleteMany({ user: userData.user_id }); // Delete all devices for the user

    return new Response(200, "T", { deletedCount: result.deletedCount }).custom(
      "Deleted all devices for the user successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.deleteOne = async (postData) => {
  try {
    let queryBuilder = Device.findByIdAndDelete(postData.id);

    const removed = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { name: removed.name }).custom(
      "deleted device successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.list = async (postData) => {
  try {
    const removeKey = ["host", "authorization"];
    removeKey.map((key) => delete postData[key]);

    const list = await Device.find().select("name");

    return new Response(200, "T", { list }).custom("device list successfully");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
