const Modal = require("../Schema/modalSchema");
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
} = require("../validation-schema/modalValidation");

// ################################################
// #               Modal list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["modal", "brand.brand"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["modal"] = postData.orderBy;

  return await ListRecordByFilter(
    Modal,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "MODAL",
    {}
  );
};

// ################################################
// #               Modal Add                      #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ modal: postData.name, "brand.brand": postData.name }],
  };

  return await AddRecord(Modal, postData, query, addValidation, "MODAL");
};

// ################################################
// #               Modal Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Modal, postData, updateValidation, "MODAL");
};

// // ################################################
// // #               Modal delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Modal, postData.id, "MODAL");
};
