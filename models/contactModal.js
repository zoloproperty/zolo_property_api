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

// ################################################
// #               Contact Add                        #
// ################################################

exports.contact_add = async (postData) => {
    const query = {
        $or: [{ contact_number: postData.contact_number }],
      };
  return await AddRecord(Contact, postData, query, addValidation, "CONTACT");
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
