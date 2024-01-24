const Brand = require("../Schema/brandSchema");
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
  handleError,
} = require("../utils/utils");
const { filterValidation } = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/brandValidation");
const Response = require("../helper/static/Response");

// ################################################
// #               Brand list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["brand", "description"];
  const removeKey = ["host", "authorization"];
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
  let updateData = postData;
  if (postData?.file) {
    updateData = { ...postData, image: postData?.file?.path };
    delete updateData.file;
  }
  const query = {
    $or: [{ brand: postData.name, brand: postData.name }],
  };

  return await AddRecord(Brand, updateData, query, addValidation, "BRAND");
};

// ################################################
// #               Brand Update                   #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;
  if (postData?.file) {
    updateData = { ...postData, image: postData?.file?.path };
    delete updateData.file;
  }
  return await UpdateRecordById(Brand, updateData, updateValidation, "BRAND");
};

// // ################################################
// // #               Brand delete                   #
// // ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Brand, postData.id, "BRAND");
};

exports.listOfBrand = async () => {
  try {
    const list = await Brand.aggregate([
      {
        $lookup: {
          from: "modal",
          localField: "brand",
          foreignField: "_id",
          as: "modal",
        },
      },
    ]);
    if (list) {
      return new Response(200, "T", {
        list: list,
      }).custom("list get successfully");
    }
  } catch (error) {
    return handleError(400, error.message);
  }
};
