const Brand = require("../Schema/vehicleSchema");
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
} = require("../validation-schema/vehicleValidation");

// ################################################
// #               Brand list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "user",
    "description",
    "purchase_year",
    "fuel_type",
    "onnership",
    "price",
    "city",
    "state",
  ];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["vehicle"] = postData.orderBy;

  return await ListRecordByFilter(
    Brand,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "VEHICHE",
    {}
  );
};

// ################################################
// #               Brand Add                      #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  return await AddRecord(Brand, postData, query, addValidation, "VEHICHE");
};

// ################################################
// #               Brand Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Brand, postData, updateValidation, "VEHICHE");
};

// // ################################################
// // #               Brand delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Brand, postData.id, "VEHICHE");
};
