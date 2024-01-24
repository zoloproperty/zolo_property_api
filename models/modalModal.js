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
  const removeKey = ["host", "authorization"];
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
    {},
    "brand"
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
  let updateData = postData;
  if (postData?.file) {
    updateData = { ...postData, image: postData?.file?.path };
    delete updateData.file;
  }
  return await AddRecord(Modal, updateData, query, addValidation, "MODAL");
};

// ################################################
// #               Modal Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;
  if (postData?.file) {
    updateData = { ...postData, image: postData?.file?.path };
    delete updateData.file;
  }

  return await UpdateRecordById(Modal, postData, updateValidation, "MODAL");
};

// // ################################################
// // #               Modal delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Modal, postData.id, "MODAL");
};
