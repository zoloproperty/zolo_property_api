const Brand = require("../Schema/brandSchema");
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
} = require("../utils/utils");
const { filterValidation } = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/brandValidation");

// ################################################
// #               Brand list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["brand"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["brand"] = postData.orderBy;

  return await ListRecordByFilter(
    Brand,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "BRAND",
    {}
  );
};

// ################################################
// #               Brand Add                      #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ brand: postData.name, "brand": postData.name }],
  };

  return await AddRecord(Brand, postData, query, addValidation, "BRAND");
};

// ################################################
// #               Brand Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Brand, postData, updateValidation, "BRAND");
};

// // ################################################
// // #               Brand delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Brand, postData.id, "BRAND");
};
