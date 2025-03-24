const Device = require("../Schema/deviceSchema");
const Property = require("../Schema/propertySchema");
const User = require("../Schema/userSchema");
const Notification = require("../Schema/notificationSchema");
const Response = require("../helper/static/Response");
const mongoose = require('mongoose');

const {
  addValidation
} = require("../validation-schema/notificationValidation");

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Use default credentials
    // Optionally, specify other configurations like databaseURL if needed
  });
}

// ################################################
// #               Ads Add                        #
// ################################################

exports.notification_upsert = async (postData) => {
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);
  const userData = postData.authData;

  if (postData.id) {
    const property = await Property.findOne({ _id: new mongoose.Types.ObjectId(postData.id) });

    if (property) {
      const users = await User.find({ city: property.city });

      if (users.length) {
        const notifications = [];

        for (const user of users) {
          // Find devices for the user
          console.log('user', user.id )
          const d =  await Device.find();
          const devices = await Device.find({ user: new mongoose.Types.ObjectId(user.id) });

          for (const device of devices) {
            if (device.deviceId) {
              const message = {
                notification: {
                  title: "New Property Notification",
                  body: `A new update is available for property in ${property.city}.`,
                  image: `https://portal.zoloproperty.in/dashboard/assets/${property_for}.png`
                },
                data: {
                  propertyId: postData.id
                },
                token: device.deviceId, // User's Firebase token
              };

              // Send Firebase notification
              try {
                const message1 = await admin.messaging().send(message);
                notifications.push({ user: new mongoose.Types.ObjectId(user._id) , property:  new mongoose.Types.ObjectId(postData.id), is_send: true });
              } catch (error) {
                console.error("Error sending notification:", error);
                notifications.push({ user: new mongoose.Types.ObjectId(user._id) , property:  new mongoose.Types.ObjectId(postData.id), is_send: false });
              }
            }
          }
        }

        if (notifications?.length) {
          // Save notifications to the database
          await Notification.insertMany(notifications);
        }

        return new Response(200, "T").custom("Notifications sent successfully");
      }
    } else {
      return new Response(404, "F").custom("Property not found");
    }
  }
};

exports.allForAProperty= async (postData) => {
  try {
    const groupedNotifications = await Notification.aggregate([
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            property:  new mongoose.Types.ObjectId(
              postData.id
            )
          }
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "users",
            // The name of the User collection
            localField: "user",
            // The field in Notification referencing the User
            foreignField: "_id",
            // The field in User that matches the reference
            as: "userDetails" // The name of the field to store the loaded User objects
          }
      },
      {
        $project:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            "userDetails.name": 1,
            // Include only the name field from userDetails
            "userDetails.contact_number": 1,
            // Include only the contact_number field from userDetails
            "userDetails.first_name": 1,
            // Include the property ID
            "userDetails.last_name": 1,
            sent: 1
          }
      },
      {
        $group:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            _id: "$userId",
            count: {
              $sum: 1
            },
            user: {
              $first: "$userDetails"
            }
          }
      }
    ]);

    return new Response(200, "T", { groupedNotifications }).custom(
      "found one device successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};


exports.getMyNotification= async (postData) => {
  try {

    const groupedNotifications = await Notification.aggregate([
      {
        $match: { "user.id": postData.id }, // Match notifications for the specific property
      },
      {
        $group: {
          _id: "$property.id", // Group by user ID
          names: { $addToSet: "$property.id" }, // Collect unique names
          notifications: { $push: "$$ROOT" }, // Push the entire notification document
        },
      },
    ]);

    return new Response(200, "T", { groupedNotifications }).custom(
      "found one device successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};


exports.deleteAllForAProperty = async (postData) => {
  try {
    const result = await Notification.deleteMany({ "property.id": postData.propertyId }); // Delete notifications for the specific property

    return new Response(200, "T", { deletedCount: result.deletedCount }).custom(
      "Deleted all notifications for the property successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};