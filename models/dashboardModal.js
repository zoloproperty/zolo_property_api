const Ads = require("../Schema/adsSchema");
const Response = require("../helper/static/Response");
const {unlinkFiles} = require("../helper/third-party/multipart");
const {
  ListRecordByFilter,
} = require("../utils/utils");


const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Ads list                       #
// ################################################

exports.dashboard_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "ads_name",
    "title",
    "description",
    "number",
    "zip_code",
  ];
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);

  return await ListRecordByFilter(
    Ads,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "Ads list",
    {}
  );
};
