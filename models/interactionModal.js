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
  likeValidation,
  adslikeValidation
} = require("../validation-schema/interactionValidation");
const ZIP_ROLE = "broker";

// ################################################
// #               Interaction list                     #
// ################################################


brokerControl = (query, role = "user", zipCode = []) => {
  if (role == ZIP_ROLE && zipCode) {
    query.$or = [
      ...(query.$or || []),
      ...zipCode.map(zip => ({
        zip_code: (zip || "").toString() || 480001
      }))
    ];
  }
};

exports.interaction_list = async postData => {
  try {
    const query = {};
    const sortOptions = { limit: 1 };
    const searchFields = ["unique_id","name", "city", "zip_code", "type", "number"];
    const removeKey = ["host", "authorization"];
    const userData = postData.authData;
    if (userData) {
      brokerControl(query, userData.role, userData.local_area);
    }
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
    // Optimized aggregation: pre-sort, group using $first, and paginate + count with $facet
    // Pre-sort interactions so $first picks the latest interaction values per user
    const preSort = { createdAt: -1 };

    // Map finalSortOptions so we can sort grouped results by latestInteractionDate if needed
    const groupSort = { ...finalSortOptions };
    if (groupSort.createdAt !== undefined) {
      groupSort.latestInteractionDate = groupSort.createdAt;
      delete groupSort.createdAt;
    }

    const pipeline = [
      { $match: query },
      { $sort: preSort },
      {
        $group: {
          _id: "$user",
          name: { $first: "$name" },
          city: { $first: "$city" },
          number: { $first: "$number" },
          zip_code: { $first: "$zip_code" },
          unique_id: { $first: "$unique_id" },
          is_converted: { $first: "$is_converted" },
          latestInteractionDate: { $max: "$createdAt" }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          city: 1,
          number: 1,
          zip_code: 1,
          unique_id: 1,
          is_converted: 1,
          latestInteractionDate: 1
        }
      },
      {
        $sort: Object.keys(groupSort).length > 0 ? groupSort : { latestInteractionDate: -1 }
      },
      {
        $facet: {
          metadata: [ { $count: "total" } ],
          data: [ { $skip: options.skip || 0 }, { $limit: options.limit || 10 } ]
        }
      }
    ];

    const aggResult = (await Interaction.aggregate(pipeline)) || [];
    const metadata = aggResult[0]?.metadata?.[0] || { total: 0 };
    const aggregatedInteractions = aggResult[0]?.data || [];
    const total = metadata.total || 0;

    // total is retrieved from the aggregation metadata above


    const formattedInteractions = aggregatedInteractions.map(
      ({ _id, name, city, number, is_converted, latestInteractionDate }) => ({
        user_id: _id,
        name,
        city,
        number,
        is_converted,
        latestInteractionDate
      })
    );
  


    const response = {
      status: 200,
      success: true,
      info: "Success",
      message: "Interactions retrieved successfully",
      data: {
        list: formattedInteractions,
        pagination: { total }
      }
    };

    return response;
  } catch (error) {
    return {
      status: 400,
      success: false,
      info: "Bad Request",
      message: error.message || "Failed to retrieve interactions"
    };
  }
};

// ################################################
// #               Interaction Add                #
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
    const user_id =  postData?.authData?.user_id
    const removeKey = ["host","authData"];
  removeKey.map(key => delete postData[key]);
    const { error, value } = likeValidation.validate(postData);
    if (error) return handleError(400, error.details[0].message);
    const {property_id } = value;

    let queryBuilder = Interaction.findOne({
      user: user_id,
      property: property_id,
      type:'like'
    }).select("type");

    const like = (await queryBuilder.exec()) || {};

    return new Response(200, "T", like).custom("like get successfully");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
exports.ad_like_check = async postData => {
  try {
    const user_id =  postData?.authData?.user_id
    const removeKey = ["host","authData"];
    removeKey.map(key => delete postData[key]);
    const { error, value } = adslikeValidation.validate(postData);
    if (error) return handleError(400, error.details[0].message);
    const {ad_id } = value;
    let queryBuilder = Interaction.findOne({
      user: user_id,
      ads: ad_id,
      type:'like'
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



exports.user_like_list_ids = async postData => {
  try {
    const user_id =  postData?.authData?.user_id
    delete postData?.authData
    delete postData?.host
    const { error, value } = filterValidation.validate(postData);

    if (error) {
      return new Response(400, "F").custom(error.details[0].message);
    }
    let queryBuilder = Interaction.find({ user:user_id, type:"like" }, 'property')
    const like = (await queryBuilder.exec()) || [];

    return new Response(200, "T", {   
       list: like.map(x => x.property),
    }
      ).custom("like property successfully")
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

// ################################################
// #        Get interactions for a specific user  #
// ################################################

exports.user_interactions = async postData => {
  try {
    const user_id = postData?.user_id;
    if (!user_id) return new Response(400, "F").custom("User id is required");

    delete postData?.authData;
    delete postData?.host;

    const query = { user: user_id };

    const queryBuilder = Interaction.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .skip(0)
      .populate({ path: "property", match: { is_deleted: false }, select: "_id" })
      .populate({ path: "ads", select: "_id" });

    let list = (await queryBuilder.exec()) || [];
    // map populated docs to id values for property and ads
    list = list.map(item => {
      const obj = typeof item.toObject === 'function' ? item.toObject() : item;
      return {
        ...obj,
        property: obj.property?._id || obj.property,
        ads: obj.ads?._id || obj.ads
      };
    });


    return new Response(200, "T", { list }).custom("user interactions retrieved");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
