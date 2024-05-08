const Ads = require("../Schema/adsSchema");
const User = require("../Schema/userSchema");
const Property = require("../Schema/propertySchema");
const Interested = require("../Schema/interestedSchema");
const Interaction = require("../Schema/interactionSchema");

const Response = require("../helper/static/Response");

// ################################################
// #               Ads list                       #
// ################################################

exports.dashboard_list = async postData => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  // Get the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  // Query the database to count interested people within the current month

  try {
    const totalUsers = await User.countDocuments();
    const totalUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalProperties = await Property.countDocuments();
    const soldProperties = await Property.countDocuments({
      property_for: "sold"
    });
    const soldPropertiesThisMonth = await Property.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      property_for: "sold"
    });
    const totalPropertiesThisMonth = await Property.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalInterested = await Interested.countDocuments();
    const totalInterestedPeopleThisMonth = await Interested.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
    });

    const totalLeadThisMonth = await Interested.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      leads: true
    });

    const totalLikeThisMonth = await Interaction.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      type: "like"
    });
    const totalViewThisMonth = await Interaction.countDocuments({
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      type: "view"
    });

    const dailyData = { date: [], interested: [], user: [], properties: [] };

    for (let day = 1; day <= currentDate.getDate(); day++) {
      const startOfDay = new Date(currentYear, currentMonth, day, 0, 0, 0);

      const endOfDay = new Date(
        currentYear,
        currentMonth,
        day,
        23,
        59,
        59,
        999
      );

      const interestedPeopleCount = await Interested.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      const totalUsersThisMonth = await User.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });

      const totalPropertiesThisMonth = await Property.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: true
      };
      dailyData.date.push(
        new Date(currentYear, currentMonth, day).toLocaleString(
          "en-US",
          options
        )
      );
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
