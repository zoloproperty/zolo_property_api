const Phone = require("../Schema/phoneSchema");
const Response = require("../helper/static/Response");
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
  OneValidation
} = require("../validation-schema/phoneValidation");

// ################################################
// #               Phone list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {$and :[{ is_deleted:false }]};
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
    $or: [{ number: postData?.contact_number,zip_code: postData?.zip_code },{is_deleted: false}],
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


// // ################################################
// // #              broker number                   #
// // ################################################


exports.model_one = async (postData) => {
  try {
    if (!postData?.authData?.zip_code) {
      return new Response(400, "F").custom("please complete your profile");
    }

    let queryBuilder = Phone.findOne({zip_code: postData?.authData?.zip_code,is_deleted:false}).select(["contact_number","is_active"]);

    const broker = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { broker }).custom(
      "broker get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
