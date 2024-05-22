const Property = require("../Schema/propertySchema");
const Response = require("../helper/static/Response");
const {
  DeleteRecordById,
  UpdateRecordById,
  ListRecordByFilter,
  AddRecord,
  buildDynamicQuery,
} = require("../utils/utils");
const {
  filterValidationProperty,
} = require("../validation-schema/filterValidation");
const {
  updateValidation,
  addValidation,
  OneValidation,
} = require("../validation-schema/propertyValidation");
const { unlinkFiles } = require("../helper/third-party/multipart");
const path = require('path');
// ################################################
// #               Property list                     #
// ################################################

exports.model_list = async (postData) => {
  const query = {is_deleted:false};
  const sortOptions = { limit: 1 };
  const searchFields = ["unique_id","price", "city", "state", "location", "property_type","admin_status"];
  const removeKey = ["host", "authorization"];
  
  removeKey.map((key) => delete postData[key]);
 

  if (postData.orderBy) sortOptions["createAt"] = postData.orderBy;

    if (postData.property_type) {
      query.property_type = postData.property_type;
    }
    
    
    
    if (postData.property_for) { 

    query.property_for =  postData.property_for;

    if (postData.max_price && postData.min_price) {
      if (postData.property_for === 'rent') {
        query.monthly_rent = { $gte: postData.min_price, $lte: postData.max_price };
      } else {
        query.expected_price = { $gte: postData.min_price, $lte: postData.max_price };
      }
    } else if (postData.max_price) {
      if (postData.property_for === 'rent') {
        query.monthly_rent = { $lte: postData.max_price };
      } else {
        query.expected_price = { $lte: postData.max_price };
      }
    } else if (postData.min_price) {
      if (postData.property_for === 'rent') {
        query.monthly_rent = { $gte: postData.min_price };
      } else {
        query.expected_price = { $gte: postData.min_price };
      }
    }
  }


let coordinatesrentArray=[],coordinatessellArray=[];
const userData = postData.authData;
if (userData) {
  if (userData?.role == "user") {
      query.admin_status = 'Approved'       
      const copyQuery = query;
      let searchFieldsQuery = buildDynamicQuery(
        searchFields,
        postData?.search,
        postData?.startDate,
        postData?.endDate
      );
      Object.assign(copyQuery, searchFieldsQuery);

      if(postData.property_for){
          if(postData.property_for == 'rent'){
            const rentcoordinates = await Property.find({...copyQuery,property_for:'rent' ,is_deleted:false,admin_status :'Approved'}, { coordinates: 1, _id: 1 }).limit(500) 
            coordinatesrentArray = rentcoordinates.map(property => ({id:property?._id,property_for:'rent',lat:property?.coordinates[0],long:property?.coordinates[1]}));
          }else{
            const sellcoordinates = await Property.find({...copyQuery,property_for:'sell', is_deleted:false,admin_status :'Approved'}, { coordinates: 1, _id: 1 }).limit(500) 
            coordinatessellArray = sellcoordinates.map(property => ({id:property?._id,property_for:'sell',lat:property?.coordinates[0],long:property?.coordinates[1]}));
          }
      }else{
          const rentcoordinates = await Property.find({...copyQuery,property_for:'rent' ,is_deleted:false,admin_status :'Approved'}, { coordinates: 1, _id: 1 }).limit(200) 
          coordinatesrentArray = rentcoordinates.map(property => ({id:property?._id,property_for:'rent',lat:property?.coordinates[0],long:property?.coordinates[1]}));
          const sellcoordinates = await Property.find({...copyQuery,property_for:'sell', is_deleted:false,admin_status :'Approved'}, { coordinates: 1, _id: 1 }).limit(200) 
          coordinatessellArray = sellcoordinates.map(property => ({id:property?._id,property_for:'sell',lat:property?.coordinates[0],long:property?.coordinates[1]}));
   
      }
    }
  }


  return await ListRecordByFilter(
    Property,
    postData,
    query,
    sortOptions,
    searchFields,
    filterValidationProperty,
    "PROPERTY",
    {coordinates:[...coordinatesrentArray,...coordinatessellArray]},
    "user"
  );
};

// ################################################
// #               One Property                   #
// ################################################

exports.model_one = async (postData) => {
  try {
    const { error, value } = OneValidation.validate(postData);
    if (error) {
      return new Response(400, "F").custom(error.details[0]?.message);
    }

    let queryBuilder = Property.find({_id:postData.id,is_deleted:false}).populate("user");

    const property = (await queryBuilder.exec()) || {};

    return new Response(200, "T", { property }).custom(
      "Property get successfully"
    );
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};
// ################################################
// #               Property Add                    #
// ################################################

exports.model_add = async (postData) => {
  // Check for duplicate records
  const query = {
    $or: [{ property: "null" }],
  };

  let updateData = postData;
  if (postData?.files) {
    console.log(postData?.files?.images)
    if (postData?.files?.images) {
      const images = (postData?.files?.images || []).map((item) => {
        return item.location;
      });
      updateData = { ...updateData, images:images };
      
    } 
    if (postData?.files?.video) {
      const video = (postData?.files?.video || [])[0]?.location;
      updateData = { ...updateData, video };
    }
    if (postData?.banner) {
      (postData?.files?.images || []).map((item) => {
        if (item.originalname == postData?.banner) {
          updateData.banner = item.location;
        }
      });
    } else {
      updateData.banner = (postData?.files?.images || [])[0]?.location;
    }
    delete updateData.files;
  }

  console.log(updateData)

  return await AddRecord(
    Property,
    updateData,
    query,
    addValidation,
    "PROPERTY"
  );
};

// ################################################
// #               Property Update                 #
// ################################################

exports.model_update = async (postData) => {
  const removeKey = ["host"];
  removeKey.map((key) => delete postData[key]);
  let updateData = postData;
  if(postData?.oldImages){
    unlinkFiles(postData?.oldImages)
  }

  const existing = await Property.findById(postData.id);
  if (!existing)
    return new Response(404, "F").custom(
      authHandler(`${MessageKey}_NOT_EXISTS`)
    );

  // video and Image
  if (postData?.files) {
    if (postData?.files?.images) {
      const images = (postData?.files?.images || []).map((item) => {
        return item.location;
      });
      updateData = { ...updateData, images: [...images,...(postData?.images||[])] };
    } 
    if (postData?.files?.video) {
      const video = (postData?.files?.video || [])[0]?.location;
      updateData = { ...updateData, video };
    }
    if (postData?.banner) {
      (postData?.files?.images || postData?.images || []).map((item) => {
        if ((item.originalname || path.basename(item)) == postData?.banner) {
          updateData.banner = item.location || item;
        }
      });
    }
    delete updateData.files;
  }
  if(!postData?.files && !(postData?.images||[])[0]){
    updateData.images = []
  }
  if(typeof updateData?.video == 'object'){
    updateData.video = updateData?.video[0]
  }
  return await UpdateRecordById(
    Property,
    updateData,
    updateValidation,
    "PROPERTY"
  );
};

// ################################################
// #               Property delete                 #
// ################################################

exports.model_delete = async (postData) => {
  return await DeleteRecordById(Property, postData.id, "PROPERTY");
};

exports.user_property = async (postData)=>{
  try {
    let queryBuilder = Property.find({user: postData?.authData?.user_id,is_deleted:false})
    const property = (await queryBuilder.exec()) || {};
    return new Response(200, "T", property).custom("user prperty get successfully");
  } catch (error) {
    return new Response(400, "F").custom(error.message);
  }
};