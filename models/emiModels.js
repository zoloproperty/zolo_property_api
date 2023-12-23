const Emi = require("../Schema/emiSchema");
const Response = require("../helper/static/Response");
const { authHandler } = require("../helper/static/messages");
const {
  handleError,
  buildDynamicQuery,
  DeleteRecordById,
} = require("../utils/utils");
const {
  updateEmiValidationSchema,
  addEmiValidationSchema,
  emiValidationSchema,
} = require("../validation-schema/emiValidation");

// ################################################
// #               Emi list                       #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["emi", "limit"];
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  try {
    const { error, value } = emiValidationSchema.validate(postData);
    if (error) {
      return handleError(400, error.details[0].message);
    }
    const { limit, offset, startDate, endDate, search, orderBy } = value;
    Object.assign(
      query,
      buildDynamicQuery(searchFields, search, startDate, endDate)
    );
    if (orderBy) sortOptions["limit"] = orderBy; // 1 for ascending, -1 for descending

    const list =
      (await Emi.find(query)
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
// #               Emi Add                        #
// ################################################

exports.model_add = async (postData) => {
  try {
    // Validate the request body
    const { error, value } = addEmiValidationSchema.validate(postData);
    if (error) return handleError(400, error.details[0].message);

    // Check for duplicate records
    const existingEmi = await Emi.findOne({
      $or: [{ limit: value.limit }, { emi: value.emi }],
    });
    if (existingEmi) {
      return new Response(400, "F").custom(authHandler("DUPLICATE_EMI_EXISTS"));
    }
    const newEmi = new Emi(value);
    await newEmi.save();

    // Respond with success message and the added EMI record
    return new Response(200, "T").custom(authHandler("EMI_ADDED"));
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// ################################################
// #               Emi Update                     #
// ################################################

exports.model_update = async (postData) => {
  try {
    console.log(postData);
    const removeKey = ["host"];
    removeKey.map((key) => delete postData[key]);
    const { error, value } = updateEmiValidationSchema.validate(postData);
    if (error) return handleError(400, error.details[0].message);
    const existingEmi = await Emi.findById(value.id);
    if (!existingEmi)
      return new Response(404, "F").custom(authHandler("EMI_NOT_EXISTS"));

    Object.assign(existingEmi, value);

    if (await existingEmi.save()) {
      return new Response(200, "T").custom(authHandler("EMI_UPD"));
    } else {
      return new Response(400, "F").custom(authHandler("EMI_UPD_FAILED"));
    }
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// ################################################
// #               Emi delete                     #
// ################################################

exports.model_delete = async (postData) => {
  try {
    return DeleteRecordById(Emi, postData.id, "EMI");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
