const Phone = require("../Schema/phoneSchema");
const Response = require("../helper/static/Response");
const { authHandler } = require("../helper/static/messages");
const { DeleteRecordById, UpdateRecordById, buildDynamicQuery } = require("../utils/utils");
const {filterMapValidation} = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/phoneValidation");

// ################################################
// #               Phone list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["name", "number"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);

  try {
    const { error, value } = filterMapValidation.validate(postData);
    if (error) {
      return handleError(400, error.details[0].message);
    }
    const { limit, offset, startDate, endDate, search, orderBy } = value;
    Object.assign(
      query,
      buildDynamicQuery(searchFields, search, startDate, endDate)
    );
    if (orderBy) sortOptions["limit"] = orderBy; // 1 for ascending, -1 for descending

    if (value.radius && value.coordinates) {
      query.coordinates = {
        $near: {
          $geometry: {
            coordinates: value.coordinates,
          },
          $maxDistance: value.radius,
        },
      };
    }

    const list =
      (await Phone.find(query)
        .limit(limit)
        .skip(offset)
        .sort(sortOptions)
        .exec()) || [];

    const pegination = {
      limit,
      offset,
      total: Math.ceil(list.length / limit),
    };
    return new Response(200, "T", { list, pegination }).custom("Tax list");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// ################################################
// #               phone Add                      #
// ################################################

exports.model_add = async (postData) => {
  try {
    // Check for duplicate records
    const query = {
      $or: [{ name: value.name }, { number: value.number }],
    };

    return AddRecord(Phone, postData, query, addValidation, "PHONE");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// ################################################
// #               Phone Update                   #
// ################################################

exports.model_update = async (postData) => {
  try {
    const removeKey = ["host"];
    removeKey.map((key) => delete postData[key]);
    return UpdateRecordById(Phone, postData, updateValidation, "PHONE");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// // ################################################
// // #               Phone delete                     #
// // ################################################

exports.model_delete = async (postData) => {
  try {
    return DeleteRecordById(Phone, postData.id, "PHONE");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
