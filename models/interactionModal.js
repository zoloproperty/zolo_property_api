const Interaction = require("../Schema/interactionSchema");
const Property = require("../Schema/propertySchema");
const Response = require("../helper/static/Response");
const {authHandler} = require("../helper/static/messages");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
  handleError
} = require("../utils/utils");
const {
  filterMapValidation, filterValidation
} = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
  likeValidation
} = require("../validation-schema/interactionValidation");

// ################################################
// #               Interaction list                     #
// ################################################

exports.interaction_list = async postData => {
  try {
    const query = {};
    const sortOptions = { limit: 1 };
    const searchFields = ["unique_id","name", "city", "zip_code", "type", "number"];
    const removeKey = ["host", "authorization"];
    removeKey.forEach(key => delete postData[key]);
    if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;

    const { limit, offset, search, order, orderBy } = postData;
    const searchQuery = search;
    let finalSortOptions = {};
    if (orderBy) {
      finalSortOptions[orderBy] = order === "DESC" ? -1 : 1;
    } else {
      finalSortOptions = { createdAt: order === "DESC" ? -1 : 1 };
    }

    // Construct search query
    let searchCriteria = {};
    if (searchFields && searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      searchCriteria = {
        $or: searchFields.map(field => ({ [field]: regex }))
      };
    }

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

    Object.assign(query, searchCriteria);

    const options = {
      limit: limit || 10,
      skip: offset || 0
    };

    const aggregatedInteractions = await Interaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$user",
          name: { $addToSet: "$name" },
          city: { $addToSet: "$city" },
          number: { $addToSet: "$number" },
          zip_code: { $addToSet: "$zip_code" },
          is_converted: { $addToSet: "$is_converted" },
          interaction: {
            $push: {
              id: "$_id",
              zip_code: "$zip_code",
              user: "$user",
              ads: "$ads",
              property: "$property",
              coordinates: "$coordinates",
              type: "$type",
              is_converted:"$is_converted",
              unique_id:"$unique_id",
              createdAt: "$createdAt",
            }
          },
        }
      },
      {
        $project: {
          _id: 1,
          interaction: 1,
          name: { $arrayElemAt: ["$name", 0] },
          city: { $arrayElemAt: ["$city", 0] },
          number: { $arrayElemAt: ["$number", 0] },
          zip_code: { $arrayElemAt: ["$zip_code", 0] },
          unique_id: { $arrayElemAt: ["$unique_id", 0] },
          is_converted: { $arrayElemAt: ["$is_converted", 0] }
        }
      },
      { $sort: finalSortOptions },
      { $limit: options.limit },
      { $skip: options.skip },
    ]);

    const formattedInteractions = aggregatedInteractions.map(
      ({ name, city, number, interaction,is_converted }) => ({
        name,
        city,
        number,
        is_converted,
        interaction,
      })
    );


    const response = {
      status: 200,
      success: true,
      info: "Success",
      message: "Interactions retrieved successfully",
      data: {
        list: formattedInteractions,
        pagination: { total:formattedInteractions?.length||0 }
      }
    };

    return response;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      success: false,
      info: "Bad Request",
      message: error.message || "Failed to retrieve interactions"
    };
  }
};

// ################################################
// #               Interaction Add                      #
// ################################################

exports.interaction_add = async postData => {
  const query = {
    $or: [{ interaction: "null" }]
  };
  if(postData?.type == 'view' && postData?.property){
    const existing = await Property.findById(postData?.property)
    if (!existing)
      return new Response(404, "F").custom(
        authHandler(`PROPERTY_NOT_EXISTS`)
      );

      Object.assign(existing,{views:existing.views + 1 });
      await existing.save()
  }
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

exports.interaction_update = async postData => {
  const removeKey = ["host"];
  removeKey.map(key => delete postData[key]);
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

exports.interaction_delete = async postData => {
  return await DeleteRecordById(Interaction, postData.id, "INTERACTION");
};

exports.like_check = async postData => {
  try {
    console.log("fjgfdlkgjflk")
    const { error, value } = likeValidation.validate(postData);
    if (error) return handleError(400, error.details[0].message);
    const {property_id } = value;
    const user_id =  postData?.authData?.user_id

    let queryBuilder = Interaction.findOne({
      user: user_id,
      property: property_id,
      is_deleted: false
    }).select("type");

    const like = (await queryBuilder.exec()) || {};

    return new Response(200, "T", like).custom("like get successfully");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.user_like_list = async postData => {
  try {
    const user_id =  postData?.authData?.user_id
    delete postData?.authData
    delete postData?.host
    const { error, value } = filterValidation.validate(postData);
    // console.log(error)

    if (error) {
      return new Response(400, "F").custom(error.details[0].message);
    }
      let queryBuilder = Interaction.find({ user:user_id,type:"like" }, 'property')
      .limit(value?.limit)
      .skip(value?.offset)
      .populate({
        path: 'property',
        match: { is_deleted: false }
      })


    const like = (await queryBuilder.exec()) || {};

    const total = await Interaction.countDocuments({ user: "65b54fe0f8eb830ec09d96e5",type:"like" });


    return new Response(200, "T", {   
       list: like,
      pagination: { total }
    }
      ).custom("like property successfully")
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
