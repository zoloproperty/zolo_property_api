const Property = require("../Schema/propertySchema");
const Response = require("../helper/static/Response");
const fs = require('fs').promises;

exports.convert = async (req, res) => {
    try {
        // Read user data
        const userData = await fs.readFile("./data/users.json", 'utf8');
        const jsonData = JSON.parse(userData);

        // Read property data
        const propertyData = await fs.readFile("./data/properties.json", 'utf8');
        const properties = JSON.parse(propertyData);

        // Map over user data and convert
        const convertedUserData = await Promise.all(jsonData.map(async (item) => {
            const userProperties = properties.filter(property => item?.id === property?.added_by);
            return convertData(item, userProperties);
        }));

        return res.status(200).json(convertedUserData);
    } catch (error) {
        return res.json(new Response(500, "F").custom(error.message));
    }
};


  function convertData(inputData,property) {
    const convertedData = {
      first_name:inputData?.first_name||'',
      last_name:inputData?.last_name||"",
      contact_number:inputData?.contact_number,
      email:inputData?.email||"",
      password:inputData?.password||"",
      role:"user",
      image:inputData?.image?"public\\old\\"+inputData?.image:"",
      state:"Mp",
      city:"chhindwara",
      zip_code:"480001",
      login_type:"google",
      is_email_verified:false,
      is_active:true,
      is_deleted:false,
      property
    };
  
    return convertedData;
  }


  function convertPropertyData(inputData) {
    const convertedData = {
        user: inputData?.added_by,
        name: "", // You need to provide a value for the name field
        state: "", // You need to provide a value for the state field
        city: inputData?.location,
        zip_code: "", // You need to provide a value for the zip_code field
        address: "", // You need to provide a value for the address field
        status: 1, // You need to provide a value for the status field
        show_verified: false,
        property_for: inputData?.property_for,
        coordinates: [parseFloat(inputData?.lat), parseFloat(inputData?.long)],
        location: inputData?.location,
        property_type: inputData?.property_type,
        saleable_area: inputData?.saleable_area,
        carpet_area: inputData?.carpet_area,
        saleable_area_size_in: inputData?.saleable_area_size_in,
        carpet_area_size_in: inputData?.carpet_area_size_in,
        additional_room: JSON.parse(inputData?.additional_room),
        expected_price: parseFloat(inputData?.expected_price),
        expected_price_in_sqft: parseFloat(inputData?.expected_price_in_sqft),
        negotiable: inputData?.negotiable,
        booking_price: parseFloat(inputData?.booking_price),
        monthly_rent: parseFloat(inputData?.monthly_rent),
        security_deposit: parseFloat(inputData?.security_deposit),
        maintance_charge: parseFloat(inputData?.maintance_charge),
        available_from: new Date(inputData?.available_from),
        property_description: inputData?.description,
        open_side: inputData?.open_side,
        facing_side: inputData?.facing_side,
        facing_road_width: parseFloat(inputData?.facing_road_width),
        facing_road_width_in: inputData?.facing_road_width_in,
        images: JSON.parse(inputData?.images),
        banner: inputData?.banner,
        video: inputData?.video,
        room_data: JSON.parse(inputData?.room_data),
        bedrooms: parseInt(inputData?.bedrooms),
        bathrooms: parseInt(inputData?.bathrooms),
        balconies: parseInt(inputData?.balconies),
        additional_facility: JSON.parse(inputData?.additional_facility),
        property_status: inputData?.property_status,
        property_age: parseInt(inputData?.property_age),
        possession_date: new Date(inputData?.possession_date),
        furnishing_status: inputData?.furnishing_status,
        wardrobe: parseInt(inputData?.wardrobe),
        beds: parseInt(inputData?.beds),
        ac: parseInt(inputData?.ac),
        tv: parseInt(inputData?.tv),
        light: inputData?.light,
        fan: inputData?.fan,
        exhaust_fan: inputData?.exhaust_fan,
        boundary_wall: inputData?.boundary_wall,
        additional_furnishing: JSON.parse(inputData?.additional_furnishing),
        other_facility: inputData?.other_facility,
        car_parking_open: parseInt(inputData?.car_parking_open),
        car_parking_close: parseInt(inputData?.car_parking_close),
        floor: parseInt(inputData?.floor),
        total_floor: parseInt(inputData?.total_floor),
        overlooking: JSON.parse(inputData?.overlooking),
        ownership_type: inputData?.ownershiptype,
        living_room: inputData?.living_room,
        kitchen: inputData?.kitchen,
        master_bedroom: inputData?.master_bedroom,
        bathroom: inputData?.bathroom,
        balcony: inputData?.balcony,
        other_bedroom: inputData?.other_bedroom,
        preferred_tenants: inputData?.preferred_tenants,
        gender_preference: inputData?.gender_preference,
        maximum_tentants_allowed: inputData?.maximum_tentants_allowed,
        work_preference: inputData?.work_preference,
        food_preference: inputData?.food_preference,
        expected_duration_of_stay: inputData?.expected_duration_of_stay,
        special_requirement: inputData?.special_requirement,
        added_by_type: inputData?.added_by_type,
        views: parseInt(inputData?.views),
        admin_status: inputData?.admin_status,
        is_active: true,
        is_deleted: false,
        unique_id: "", // You need to provide a value for the unique_id field
    };

    return convertedData;
}
