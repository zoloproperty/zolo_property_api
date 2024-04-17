const Ads = require("../Schema/adsSchema");
const Response = require("../helper/static/Response");
const {unlinkFiles} = require("../helper/third-party/multipart");
const {
  handleError,
  buildDynamicQuery,
  DeleteRecordById,
  UpdateRecordById,
  AddRecord,
  ListRecordByFilter,
} = require("../utils/utils");
const {
  updateValidation,
  addValidation,
} = require("../validation-schema/adsValidation");
const { filterValidation } = require("../validation-schema/filterValidation");

// ################################################
// #               Ads list                       #
// ################################################

exports.ads_list = async (postData) => {
  const query = {};
  const sortOptions = { limit: 1 };
  const searchFields = [
    "ads_name",
    "title",
    "description",
    "number",
    "zip_code",
  ];
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);

  return await ListRecordByFilter(
    Ads,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidation,
    "Ads list",
    {}
  );
};

// ################################################
// #               Ads Add                        #
// ################################################

exports.ads_add = async (postData) => {
  const query = {
    $or: [{ ads_name: postData.ads_name }],
  };
  const removeKey = ["host", "authorization"];
  removeKey.map((key) => delete postData[key]);

  let updateData = postData;
  if (postData?.files) {
    if (postData?.files?.images) {
      const gallery = (postData?.files?.images || []).map((item) => {
        return item.path;
      });
      updateData = { ...postData, gallery };
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

  return await AddRecord(Ads, updateData, query, addValidation, "ADS");
};

// ################################################
// #               Ads Update                     #
// ################################################

exports.ads_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);

  let updateData = postData;
  if(postData?.oldImages){
    unlinkFiles(postData?.oldImages)
  }

  if (postData?.files) {
    if (postData?.files) {
      const gallery = (postData?.files || []).map((item) => {
        return item.path;
      }); 
      updateData = { ...postData, gallery:[...gallery,...(postData?.gallery||[])] };
    }
    if (postData?.banner) {
      (postData?.files || postData?.gallery || []).map((item) => {
        if ((item.originalname || item?.split('\\').pop()) == postData?.banner) {
          updateData.banner = item.path || item;
        }
      });
    }
    delete updateData.files;
  }
  if(!postData?.files && !(postData?.gallery||[])[0]){
    updateData.gallery = []
  }


  return await UpdateRecordById(Ads, updateData, updateValidation, "ADS");
};

// ################################################
// #               Ads delete                     #
// ################################################

exports.ads_delete = async (postData) => {
  return await DeleteRecordById(Ads, postData.id, "ADS");
};
