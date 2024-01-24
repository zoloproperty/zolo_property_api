const { Schema, model } = require("mongoose");
const path = require("path");

const brandSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Brand name is required"],
    },
    image: {
      type: String,
      required: [true, "Brand image is required"],
    },
    description: {
      type: String,
      required: [true, "Brand description is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

brandSchema.virtual("url").get(function () {
  const hostUrl = process.env.HostURL;
  const newPath = path.relative('public', this.image)
  return path.join(hostUrl, newPath);
});

// Use toJSON option to include virtuals when converting the document to JSON
brandSchema.set("toJSON", { virtuals: true });

const Brand = model("brand", brandSchema);
module.exports = Brand;
