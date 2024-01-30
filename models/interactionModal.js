const Interaction = require("../Schema/interactionSchema");
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
// #               Interaction list                     #
// ################################################

exports.interaction_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "user.name",
    "user.last_name",
    "user.city",
    "user.state",
    "user.address",
    "user.number",
    "vehicle.product_type",
    "vehicle.brand.brand",
    "vehicle.modal.modal",
  ];
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;

  return await ListRecordByFilter(
    Interaction,
    postData,
    query,
    sortOptions,
    searchFields,
    filterMapValidation,
    "INTERACTION",
    {}
  );
};

// ################################################
// #               Interaction Add                      #
// ################################################

exports.interaction_add = async (postData) => {
  const query = {
    // $or: [{ user: postData.user }],
  };

  return await AddRecord(
    Interaction,
    postData,
    query,
    addValidation,
    "INTERACTION"
  );
};

// ################################################
// #               Interested Update                   #
// ################################################

exports.interaction_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  return await UpdateRecordById(
    Interaction,
    postData,
    updateValidation,
    "INTERACTION"
  );
};

// // ################################################
// // #               Interested delete                   #
// // ################################################

exports.interaction_delete = async (postData) => {
  return await DeleteRecordById(Interaction, postData.id, "INTERACTION");
};
