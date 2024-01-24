const Property = require("../Schema/propertySchema");
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
} = require("../validation-schema/propertyValidation");

// ################################################
// #               Property list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["price", "city", "state"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["property"] = postData.orderBy;

  return await ListRecordByFilter(
    Property,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "PROPERTY",
    {}
  );
};

// ################################################
// #               Property Add                    #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ property: "null" }],
  };

  let updateData = postData;
  console.log(updateData);
  if (postData?.files) {
    const images = postData?.files?.map((item) => {
      console.log(item);
      return item.path;
    });
    updateData = { ...postData, images };
    delete updateData.files;
  }
  return await AddRecord(Property, postData, query, addValidation, "PROPERTY");
};

// ################################################
// #               Property Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(
    Property,
    postData,
    updateValidation,
    "PROPERTY"
  );
};

// // ################################################
// // #               Property delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Property, postData.id, "PROPERTY");
};
