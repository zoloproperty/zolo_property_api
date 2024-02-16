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
  const searchFields = ["name", "contact_number", "city", "number", "zip_code"];
  const removeKey = ["host", "authorization"];
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
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  postData.user = postData.authData.user_id;
  const query = {
    $or: [{ number: postData.contact_number }, { is_deleted: 1 }],
  };

  return await AddRecord(Phone, postData, query, addValidation, "PHONE");
};

// ################################################
// #               Phone Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  postData.user = postData.authData.user_id;
  return await UpdateRecordById(Phone, postData, updateValidation, "PHONE");
};

// // ################################################
// // #               Phone delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Phone, postData.id, "PHONE");
};
