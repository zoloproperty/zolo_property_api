const Interested = require("../Schema/interestedSchema");
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
} = require("../utils/utils");
const {
  filterMapValidation,
} = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/interestedValidation");

// ################################################
// #               Interested list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "user.name",
    "user.last_name",
    "user.city",
    "user.state",
    "user.address",
    "user.number",
    "vehicle.product_type",
    "vehicle.brand.brand",
    "vehicle.modal.modal",
  ];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;

  return await ListRecordByFilter(
    Interested,
    postData,
    query,
    sortOptions,
    searchFields,
    filterMapValidation,
    "INTERESTED",
    {}
  );
};

// ################################################
// #               Interested Add                      #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  return await AddRecord(
    Interested,
    postData,
    query,
    addValidation,
    "INTERESTED"
  );
};

// ################################################
// #               Interested Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(
    Interested,
    postData,
    updateValidation,
    "INTERESTED"
  );
};

// // ################################################
// // #               Interested delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Interested, postData.id, "INTERESTED");
};
