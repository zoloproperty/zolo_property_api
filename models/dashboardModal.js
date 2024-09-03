const Ads = require("../Schema/adsSchema");
const User = require("../Schema/userSchema");
const Property = require("../Schema/propertySchema");
const Interested = require("../Schema/interestedSchema");
const Interaction = require("../Schema/interactionSchema");

const Response = require("../helper/static/Response");
const {brokerControl} = require("../utils/brokerControl");

// ################################################
// #               Ads list                       #
// ################################################

exports.dashboard_list = async postData => {
  const currentDate = new Date();
  const currentYear = postData.year || currentDate.getFullYear();
  const currentMonth = postData.month !== undefined ? postData.month - 1 : currentDate.getMonth(); // month is zero-based in JS Date
  const query = { is_deleted: false };

  // Get the first day of the selected month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

  // Get the last day of the selected month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59, 999);

  // Query the database to count interested people within the selected month
  const userData = postData.authData;
  if (userData) {
    brokerControl(query, userData.role, userData.local_area);
  }
  let likeQuery = {}
  if (userData) {
    brokerControl(likeQuery, userData.role, userData.local_area);
  }

  try {
    const totalUsers = await User.countDocuments(query);
    const totalUsersThisMonth = await User.countDocuments({
      ...query,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalProperties = await Property.countDocuments(query);
    const soldProperties = await Property.countDocuments({
      ...query,
      property_for: "sold"
    });
    const soldPropertiesThisMonth = await Property.countDocuments({
      ...query,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      property_for: "sold"
    });
    const totalPropertiesThisMonth = await Property.countDocuments({
      ...query,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalInterested = await Interested.countDocuments(query);
    const totalInterestedPeopleThisMonth = await Interested.countDocuments({
      ...query,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalLeadThisMonth = await Interested.countDocuments({
      ...query,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      leads: true
    });

    const totalLikeThisMonth = await Interaction.countDocuments({
      ...likeQuery,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      type: "like"
    });
    const totalViewThisMonth = await Interaction.countDocuments({
      ...likeQuery,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      type: "view"
    });

    const dailyData = { date: [], interested: [], user: [], properties: [] };

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const startOfDay = new Date(currentYear, currentMonth, day, 0, 0, 0);
      const endOfDay = new Date(currentYear, currentMonth, day, 23, 59, 59, 999);

      const interestedPeopleCount = await Interested.countDocuments({
        ...query,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      const totalUsersThisMonth = await User.countDocuments({
        ...query,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });

      const totalPropertiesThisMonth = await Property.countDocuments({
        ...query,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });

      const options = { day: "2-digit", month: "2-digit", year: "numeric", hour12: true };
      dailyData.date.push(new Date(currentYear, currentMonth, day).toLocaleString("en-US", options));
      dailyData.interested.push(interestedPeopleCount);
      dailyData.user.push(totalUsersThisMonth);
      dailyData.properties.push(totalPropertiesThisMonth);
    }

    return new Response(200, "T", {
      totalUsers,
      totalUsersThisMonth,
      totalProperties,
      soldProperties,
      soldPropertiesThisMonth,
      totalPropertiesThisMonth,
      totalInterested,
      totalInterestedPeopleThisMonth,
      totalLeadThisMonth,
      totalLikeThisMonth,
      totalViewThisMonth,
      dailyData
    }).custom("list get successfully");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

