const Response = require("../helper/static/Response");
const { authHandler } = require("../helper/static/messages");

exports.handleError = (statusCode, message) => {
  return new Response(statusCode, "F").custom(message);
};

exports.buildDynamicQuery = (searchFields, searchString, start, end) => {
  const dynamicQuery = {};

  if (start && end) {
    query.created_at = { $gte: start, $lte: end };
  } else if (start) {
    query.created_at = { $gte: start };
  }

  if (searchString) {
    dynamicQuery.$or = searchFields.map((field) => ({
      [field]: { $regex: new RegExp(searchString, "i") },
    }));
  }

  return dynamicQuery;
};

exports.DeleteRecordById = async (Model, id, MessageKey) => {
  try {
    const existingRecord = await Model.findById(id);

    if (!existingRecord) {
      return new Response(400, "F").custom(authHandler(EMI_NOT_EXISTS));
    }

    const deletionResult = await existingRecord.deleteOne();

    if (deletionResult.deletedCount > 0) {
      return new Response(200, "T").custom(
        authHandler(`${MessageKey}_DELETED`)
      );
    } else {
      return new Response(400, "F").custom(
        authHandler(`FAILED_DELETE_${MessageKey}`)
      );
    }
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.UpdateRecordById = async (
  Model,
  postData,
  updateValidation,
  MessageKey
) => {
  try {
    const { error, value } = updateValidation.validate(postData);
    if (error) return handleError(400, error.details[0].message);
    const existing = await Model.findById(value.id);
    if (!existing)
      return new Response(404, "F").custom(
        authHandler(`${MessageKey}_NOT_EXISTS`)
      );

    Object.assign(existing, value);

    if (await existing.save()) {
      return new Response(200, "T").custom(authHandler(`${MessageKey}_UPD`));
    } else {
      return new Response(400, "F").custom(
        authHandler(`${MessageKey}_UPD_FAILED`)
      );
    }
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.AddRecord = async (
  Model,
  postData,
  FindQuery,
  addValidation,
  MessageKey
) => {
  try {
    // Validate the request body
    const { error, value } = addValidation.validate(postData);
    if (error) return handleError(400, error.details[0].message);

    // Check for duplicate records
    const existingEmi = await Model.findOne(FindQuery);

    if (existingEmi) {
      return new Response(400, "F").custom(
        authHandler(`DUPLICATE_${MessageKey}_EXISTS`)
      );
    }
    const newEmi = new Model(value);
    await newEmi.save();

    // Respond with success message and the added EMI record
    return new Response(200, "T").custom(authHandler(`${MessageKey}_ADDED`));
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
