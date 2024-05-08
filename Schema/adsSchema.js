const { Schema, model } = require("mongoose");

const adsSchema = new Schema(
  {
    ads_name: {
      type: String,
      required: [true, "name is required"],
    },
    title: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "name is required"],
    },
    banner: {
      type: String,
      required: [true, "Ads main Image is required"],
    },
    gallery: [{ type: String, default: null }],
    show_number: {
      type: Boolean,
      default: true,
    },
    show_map: {
      type: Boolean,
      default: true,
    },
    number: {
      type: String,
      required: [true, "number is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    zip_code: {
      type: String,
      required: [true, "Zip code is required"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
    expiry_date: {
      type: Date,
      default: () => {
        const currentDate = new Date();
        const next30Days = new Date(currentDate);
        next30Days.setDate(currentDate.getDate() + 30);
        return next30Days;
      },
    },
  },
  { timestamps: true }
);
adsSchema.virtual("galleryUrls").get(function () {
  return this.gallery.map((image) => {
    const hostUrl = "http://192.168.1.7:5000" || process.env.HostURL.replace(/\\/g, "/");
    const newPath = image.replace(/\\/g, "/").replace(/^public\//, "");
    if (newPath) {
      return `${hostUrl}/${newPath}`;
    } else {
      return "";
    }
  });
});


adsSchema.virtual("bannerUrl").get(function () {
  const hostUrl = "http://192.168.1.7:5000" ||  process.env.HostURL.replace(/\\/g, "/");
  const newPath = (this.banner || "")
    .replace(/\\/g, "/")
    .replace(/^public\//, "");
  if (newPath) {
    return `${hostUrl}/ads/${newPath}`;
  } else {
    return "";
  }
});

adsSchema.set("toJSON", { virtuals: true });

const Ads = model("ads", adsSchema);
module.exports = Ads;
