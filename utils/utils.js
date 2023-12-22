const Response = require("../helper/static/Response");
const { authHandler } = require("../helper/static/messages");

exports.handleError = (statusCode, message) => {
  return new Response(statusCode, "F").custom(authHandler(message));
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

exports.DeleteRecordById = async (model, id, MessageKey) => {
  try {
    const existingRecord = await model.findById(id);

    if (!existingRecord) {
      return new Response(400, "F").custom(authHandler(EMI_NOT_EXISTS));
    }

    if (await existingRecord.remove()) {
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
