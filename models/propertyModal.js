const Property = require("../Schema/propertySchema");
const Response = require("../helper/static/Response");
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
} = require("../utils/utils");
const {
  filterValidationProperty,
} = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
  OneValidation,
} = require("../validation-schema/propertyValidation");

// ################################################
// #               Property list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = ["price", "city", "state", "location", "property_type"];
  const removeKey = ["host", "authorization"];

  removeKey.map((key) => delete postData[key]);
  if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;
  if (postData.property_for) {
    query.$and = [{ property_for: postData.property_for }];
  }
  if (postData.property_type) {
    if (query.$and) {
      query.$and = [...query.$and, { property_type: postData.property_type }];
    } else {
      query.$and = [{ property_type: postData.property_type }];
    }
  }

  return await ListRecordByFilter(
    Property,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidationProperty,
    "PROPERTY",
    {}
  );
};

// ################################################
// #               One Property                   #
// ################################################

exports.model_one = async (postData) => {
  try {
    const { error, value } = OneValidation.validate(postData);
    if (error) {
      return new Response(400, "F").custom(error.details[0]?.message);
    }

    let queryBuilder = Property.findById(postData.id);

    const property = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { property }).custom(
      "Property get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
// ################################################
// #               Property Add                    #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ property: "null" }],
  };

  let updateData = postData;
  if (postData?.files) {
    console.log(postData.files);
    if (postData?.files?.images) {
      const images = (postData?.files?.images || []).map((item) => {
        return item.path;
      });
      updateData = { ...postData, images };
    } else if (postData?.files?.video) {
      const video = (postData?.files?.video || [])[0]?.path;
      console.log(video);
      updateData = { ...postData, video };
    }
    if (postData?.banner) {
      (postData?.files?.images || []).map((item) => {
        if (item.originalname == postData?.banner) {
          updateData.banner = item.path;
        }
      });
    } else {
      updateData.banner = (postData?.files?.images || [])[0]?.path;
    }
    delete updateData.files;
  }

  return await AddRecord(
    Property,
    updateData,
    query,
    addValidation,
    "PROPERTY"
  );
};

// ################################################
// #               Property Update                 #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;

  const existing = await Property.findById(postData.id);
  if (!existing)
    return new Response(404, "F").custom(
      authHandler(`${MessageKey}_NOT_EXISTS`)
    );

  // video and Image
  if (postData?.files) {
    if (postData?.files?.images) {
      const images = (postData?.files?.images || []).map((item) => {
        return item.path;
      });
      updateData = { ...postData, images: [...existing.images, ...images] };
    } else if (postData?.files?.video) {
      const video = (postData?.files?.video || [])[0]?.path;
      updateData = { ...postData, video };
    }
    if (postData?.banner) {
      (postData?.files?.images || []).map((item) => {
        if (item.originalname == postData?.banner) {
          updateData.banner = item.path;
        }
      });
    }
    delete updateData.files;
  }

  return await UpdateRecordById(
    Property,
    updateData,
    updateValidation,
    "PROPERTY"
  );
};

// ################################################
// #               Property delete                 #
// ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Property, postData.id, "PROPERTY");
};
