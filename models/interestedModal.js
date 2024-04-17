const Interested = require("../Schema/interestedSchema");
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
} = require("../validation-schema/interestedValidation");

// ################################################
// #               Interested list                     #
// ################################################

exports.interested_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "name",
    "city",
    "zip_code",
    "note",
    "unique_id",
    "status",
  ];
  const removeKey = ["host" , "authorization"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;

  return await ListRecordByFilter(
    Interested,
    postData,
    query,
    sortOptions,
    searchFields,
    filterMapValidation,
    "INTERESTED",
    {}
  );
};

// ################################################
// #               Interested Add                      #
// ################################################

exports.interested_add = async (postData) => {
  const query = {
    $or: [{ name: "INTERESTED12316515454", }],
  };

  return await AddRecord(
    Interested,
    postData,
    query,
    addValidation,
    "INTERESTED"
  );
};

// ################################################
// #               Interested Update                   #
// ################################################

exports.interested_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(
    Interested,
    postData,
    updateValidation,
    "INTERESTED"
  );
};

// // ################################################
// // #               Interested delete                   #
// // ################################################

exports.interested_delete = async (postData) => {
  return await DeleteRecordById(Interested, postData.id, "INTERESTED");
};
