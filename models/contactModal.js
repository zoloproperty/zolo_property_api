const Contact = require("../Schema/contactSchema");
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
} = require("../validation-schema/contactValidation");
const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Contact list                       #
// ################################################

exports.contact_list = async (postData) => {
  const query = {$and :[{ is_deleted:false }]};
  const sortOptions = { limit: 1 };
  const searchFields = ["contact", "limit"];
  const removeKey = ["host" ,"authorization"];
  removeKey.map((key) => delete postData[key]);

  
  return await ListRecordByFilter(
    Contact,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "Contact list",
    {}
  );
};


exports.model_one = async (postData) => {
  try {
    const userData = postData.authData;

    let queryBuilder = Property.find({contact_number: userData?.contact_number, is_deleted:false})

    const user = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { user }).custom(
      "join get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
// ################################################
// #               Contact Add                        #
// ################################################

exports.contact_add = async (postData) => {
  const userData = postData.authData;
    const query = {
        $or: [{ contact_number: userData?.contact_number }],
      };

     const data = {
        name:userData?.first_name + " " + userData?.last_name,
        address:userData?.city || "",
        contact_number:userData?.contact_number
      }

  return await AddRecord(Contact, data, query, addValidation, "CONTACT");
};

// ################################################
// #               Contact Update                     #
// ################################################

exports.contact_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(Contact, postData, updateValidation, "CONTACT");
};




// ################################################
// #               Contact delete                     #
// ################################################

exports.contact_delete = async (postData) => {
  return await DeleteRecordById(Contact, postData.id, "CONTACT");
};
