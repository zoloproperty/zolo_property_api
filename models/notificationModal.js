const Device = require("../Schema/deviceSchema");
const Property = require("../Schema/propertySchema");
const User = require("../Schema/userSchema");
const Notification = require("../Schema/notificationSchema");
const Response = require("../helper/static/Response");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");

const key = "6Le0DgMTAAAAANokdEEial"; //length=22
const iv = "mHGFxENnZLbienLyANoi.e123"; //length=25

const key1 = CryptoJS.enc.Base64.parse(key); // length=16 bytes
//key is now e8b7b40e031300000000da247441226a5d, length=32 (hex encoded)
const iv1 = CryptoJS.enc.Base64.parse(iv); // length=16 bytes
//iv is now 987185c4436764b6e27a72f2fffffffd, length=32 (hex encoded)

const {
  addValidation,
} = require("../validation-schema/notificationValidation");

const admin = require("firebase-admin");

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

  if (postData.id) {
    const property = await Property.findOne({
      _id: new mongoose.Types.ObjectId(postData.id),
    });

    if (property) {
      const users = await User.find({ city: property.city.trim() });

      if (users.length) {
        const notifications = [];
        // Find devices for the user
        const devices = await Device.find({
          user: { $in: users.map((user) => user.id) },
        });

        for (const device of devices) {
          if (device.deviceId) {
            const decrypted = device.deviceId;
            if (decrypted) {
              // Prepare the notification message
              const message = {
                notification: {
                  title: "Zolo Property Notification",
                  body: `A new update is available for property in ${property.city}.`,
                  image: `https://portal.zoloproperty.in/dashboard/assets/${property.property_for}.png`,
                },
                data: {
                  propertyId: property.id,
                  property_for: property.property_for,
                },
                token: decrypted, // User's Firebase token
              };

              // Send Firebase notification
              try {
                const message1 = await admin.messaging().send(message);
                notifications.push({
                  user: new mongoose.Types.ObjectId(device.user),
                  property: new mongoose.Types.ObjectId(postData.id),
                  is_send: true,
                  messageId: message1
                });
              } catch (error) {
                if (error.code === 'messaging/registration-token-not-registered') {
                  console.error("Registration token not registered. Removing device:", device._id);
                  // Optionally, remove or mark the device as inactive in DB here
                  await Device.deleteOne({ _id: device._id.toString() });

                } else {
                  console.error("Error sending notification:", error);
                }
                notifications.push({
                  user: new mongoose.Types.ObjectId(device.user),
                  property: new mongoose.Types.ObjectId(postData.id),
                  error: error.message,
                  is_send: false,
                });
              }
            }
          }
        }


        if (notifications?.length) {
          // Save notifications to the database
          await Notification.insertMany(notifications);
        }
      }
      return new Response(200, "T").custom("Notifications sent successfully");
    }
  } else {
    return new Response(404, "F").custom("Property not found");
  }
};

exports.allForAProperty = async (postData) => {
  try {
    const groupedNotifications = await Notification.aggregate(
      [
        {
          $match: {
            property: new mongoose.Types.ObjectId(postData.id), // Filter by property id
          },
        },
        {
          $group: {
            _id: "$user", // Group by user ObjectId
            notifications: { $push: "$$ROOT" }, // All notifications for the user
            count: { $sum: 1 }, // Number of notifications
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            notifications: {
              $arrayElemAt: ["$notifications", 0], // Flatten userDetails array
            },
            count: 1,
            userDetails: {
              $arrayElemAt: [
                {
                  $map: {
                    input: "$userDetails",
                    as: "user",
                    in: {
                      first_name: "$$user.first_name",
                      last_name: "$$user.last_name",
                      contact_number: "$$user.contact_number",
                    },
                  },
                },
                0,
              ],
            },
          },
        },
      ]
    );

    return new Response(200, "T", { groupedNotifications }).custom(
      "found one device successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};

exports.getMyNotification = async (postData) => {
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
    const result = await Notification.deleteMany({
      "property.id": postData.propertyId,
    }); // Delete notifications for the specific property

    return new Response(200, "T", { deletedCount: result.deletedCount }).custom(
      "Deleted all notifications for the property successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};