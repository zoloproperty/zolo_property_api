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
} = require("../validation-schema/interactionValidation");

// ################################################
// #               Interaction list                     #
// ################################################

exports.interaction_list = async (postData) => {
  try {
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
    removeKey.forEach((key) => delete postData[key]);
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
        $or: searchFields.map((field) => ({ [field]: regex })),
      };
    }

    Object.assign(query, searchCriteria);

    const options = {
      limit: limit || 10,
      skip: offset || 0,
    };

    const aggregatedInteractions = await Interaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          city: { $first: "$city" },
          number: { $first: "$number" },
          zip_code: { $first: "$zip_code" },
          interaction: {
            $push: {
              id: "$_id",
              zip_code: "$zip_code",
              user: "$user",
              ads: "$ads",
              property: "$property",
              coordinates: "$coordinates",
              type: "$type",
              createdAt: "$createdAt",
            },
          },
        },
      },
      { $sort: finalSortOptions },
      { $limit: options.limit },
      { $skip: options.skip },
    ]);

    const formattedInteractions = aggregatedInteractions.map(
      ({ name, city, number, interaction }) => ({
        name,
        city,
        number,
        interaction,
      })
    );

    const total = await Interaction.countDocuments(query);

    const response = {
      status: 200,
      success: true,
      info: "Success",
      message: "Interactions retrieved successfully",
      data: {
        list: formattedInteractions,
        pagination: { total },
      },
    };

    return response;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      success: false,
      info: "Bad Request",
      message: error.message || "Failed to retrieve interactions",
    };
  }
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
