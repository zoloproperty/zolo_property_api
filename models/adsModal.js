const Ads = require("../Schema/adsSchema");
const Response = require("../helper/static/Response");
const {
  handleError,
  buildDynamicQuery,
  DeleteRecordById,
  UpdateRecordById,
  AddRecord,
  ListRecordByFilter,
} = require("../utils/utils");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/adsValidation");
const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Ads list                       #
// ################################################

exports.ads_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["Ads"];
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

// ################################################
// #               Ads Add                        #
// ################################################

exports.ads_add = async (postData) => {
  const query = {
    $or: [{ ads_name: postData.ads_name }],
  };
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;

  if (postData?.files) {
    const gallery = postData?.files?.map((item) => {
      return item.path;
    });
    updateData = { ...postData, gallery };
    updateData.banner = gallery[0];
    delete updateData.files;
  }

  return await AddRecord(Ads, updateData, query, addValidation, "ADS");
};

// ################################################
// #               Ads Update                     #
// ################################################

exports.ads_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Ads, postData, updateValidation, "ADS");
};

// ################################################
// #               Ads delete                     #
// ################################################

exports.ads_delete = async (postData) => {
  return await DeleteRecordById(Ads, postData.id, "ADS");
};
