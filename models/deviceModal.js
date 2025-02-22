const Device = require("../Schema/deviceSchema");
const Response = require("../helper/static/Response");
const {

  DeleteRecordById,
  UpdateRecordById,
  AddRecord,
  ListRecordByFilter,
} = require("../utils/utils");
const {
  addValidation
} = require("../validation-schema/deviceValidation");
const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Ads Add                        #
// ################################################

exports.device_add = async (postData) => {
  const query = {
    $or: [{ ads_name: postData.ads_name }],
  };
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);

  let updateData = postData;
  if (postData?.files) {
    if (postData?.files) {
      const gallery = (postData?.files || []).map((item) => {
        return item.location;
      });
      updateData = { ...updateData, gallery };
    } 
    if (postData?.banner) {
      (postData?.files || []).map((item) => {
        if (item.originalname == postData?.banner) {
          updateData.banner = item.location;
        }
      });
    } else {
      updateData.banner = (postData?.files || [])[0]?.location;
    }
    delete updateData.files;
  }

  return await AddRecord(Device, updateData, query, addValidation, "ADS");
};

exports.model_one = async (postData) => {
  try {

    let queryBuilder = Device.findOne({ deviceId: postData.uniqueId })

    const ads = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { ads }).custom(
      "registered successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};