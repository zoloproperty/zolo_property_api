const Property = require("../Schema/propertySchema");
const Response = require("../helper/static/Response");
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
  OneValidation,
} = require("../validation-schema/propertyValidation");

// ################################################
// #               Property list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["price", "city", "state"];
  const removeKey = ["host", "authorization"];
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
// #               One Property                   #
// ################################################

exports.model_one = async (postData) => {
  try {
    const { error, value } = OneValidation.validate(postData);
    if (error) {
      return new Response(400, "F").custom(error.details[0]?.message);
    }

    let queryBuilder = Property.findById(postData.id);

    const property = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { property }).custom(
      "Property get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
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

  if (postData?.files) {
    const images = postData?.files?.map((item) => {
      return item.path;
    });
    updateData = { ...postData, images };
    delete updateData.files;
  }
  return await AddRecord(
    Property,
    updateData,
    query,
    addValidation,
    "PROPERTY"
  );
};

// ################################################
// #               Property Update                 #
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

// ################################################
// #               Property delete                 #
// ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Property, postData.id, "PROPERTY");
};
