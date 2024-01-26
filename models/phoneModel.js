const Phone = require("../Schema/phoneSchema");
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
} = require("../validation-schema/phoneValidation");

// ################################################
// #               Phone list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["name", "city", "number"];
  const removeKey = ["host" , "authorization"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["city"] = postData.orderBy;

  return await ListRecordByFilter(
    Phone,
    postData,
    query,
    sortOptions,
    searchFields,
    filterMapValidation,
    "PHONE",
    {}
  );
};

// ################################################
// #               phone Add                      #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ name: postData.name }, { number: postData.number }],
  };

  return await AddRecord(Phone, postData, query, addValidation, "PHONE");
};

// ################################################
// #               Phone Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Phone, postData, updateValidation, "PHONE");
};

// // ################################################
// // #               Phone delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Phone, postData.id, "PHONE");
};
