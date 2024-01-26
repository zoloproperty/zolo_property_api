const Response = require("../helper/static/Response");
const { authHandler } = require("../helper/static/messages");

exports.handleError = (statusCode, message) => {
  return new Response(statusCode, "F").custom(message);
};

exports.buildDynamicQuery = (searchFields, searchString, start, end) => {
  const dynamicQuery = {};

  if (start && end) {
    dynamicQuery.createdAt = { $gte: start, $lte: end };
  } else if (start) {
    dynamicQuery.createdAt = { $gte: start };
  }

  if (searchString) {
    dynamicQuery.$or = searchFields.map((field) => ({
      [field]: { $regex: new RegExp(searchString, "i") },
    }));
  }

  return dynamicQuery;
};

exports.ListRecordByFilter = async (
  Model,
  postData,
  query,
  sortOptions,
  searchFields,
  Validation,
  Message,
  extraData,
  populate
) => {
  try {
    const { error, value } = Validation.validate(postData);
    if (error) {
      return new Response(400, "F").custom(error.details[0].message);
    }

    const { limit, offset, startDate, endDate, search } = value;
    let searchFieldsQuery = this.buildDynamicQuery(
      searchFields,
      search,
      startDate,
      endDate
    );
    Object.assign(query, searchFieldsQuery);

    if (value.radius && value.coordinates) {
      query.coordinates = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: value.coordinates,
          },
          $maxDistance: value.radius,
        },
      };
    }

    let queryBuilder = Model.find(query)
      .limit(limit)
      .skip(offset)
      .sort(sortOptions).populate(populate);

    // Conditionally add populate
    // if (populate) {
    //   queryBuilder = queryBuilder;
    // }

    const list = (await queryBuilder.exec()) || [];

    const total = await Model.find(query);
    const pagination = {
      limit,
      offset,
      total: total.length,
    };

    return new Response(200, "T", { list, pagination, ...extraData }).custom(
      Message || "list get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.DeleteRecordById = async (Model, id, MessageKey) => {
  try {
    if (!id) {
      return new Response(400, "F").custom(`${MessageKey} id is required.`);
    }
    const existingRecord = await Model.findById(id);

    if (!existingRecord) {
      return new Response(400, "F").custom(
        authHandler(`${MessageKey}_NOT_EXISTS`)
      );
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
    if (error) return this.handleError(400, error.details[0].message);
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
    if (error) return this.handleError(400, error.details[0].message);

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