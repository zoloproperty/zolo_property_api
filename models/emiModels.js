const Emi = require("../Schema/emiSchema");
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
} = require("../validation-schema/emiValidation");
const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Emi list                       #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["emi", "limit"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);

  return await ListRecordByFilter(
    Emi,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "Emi list",
    {}
  );
};

// ################################################
// #               Emi Add                        #
// ################################################

exports.model_add = async (postData) => {
  const query = {
    $or: [
      { limit: postData.limit },
      // , { emi: value.emi }
    ],
  };
  return await AddRecord(Emi, postData, query, addValidation, "EMI");
};

// ################################################
// #               Emi Update                     #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Emi, postData, updateValidation, "EMI");
};

// ################################################
// #               Emi delete                     #
// ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Emi, postData.id, "EMI");
};
