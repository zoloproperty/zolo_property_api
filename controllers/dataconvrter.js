const Response = require("../helper/static/Response");
const fs = require('fs').promises;
const Property = require("../Schema/propertySchema");
const User = require("../Schema/userSchema");

exports.convert = async (req, res) => {
    try {
        // Read user data
        const userData = await fs.readFile("./data/users.json", 'utf8');
        const jsonData = JSON.parse(userData);
        
        // Read property data
        const propertyData = await fs.readFile("./data/properties.json", 'utf8');
        const properties = JSON.parse(propertyData);

         // Iterate over users
         for (const user of jsonData) {
          // Insert user data into the MongoDB database
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
          const newUser = new User(convertData(user));
          await newUser.save();

          // Filter properties for this user
          const userProperties = properties.filter(property => user.id === property.added_by);
          
          // Insert properties for this user
          for (const property of userProperties) {
              const newProperty = new Property({
                ...convertPropertyData(property),
                  user: newUser._id,
                  name: `${user.first_name} ${user.last_name}`,
              });
              await newProperty.save();
          }
        }
        else{

        }
      }

      return res.status(200).json({ message: "Conversion successful" });
    } catch (error) {
        return res.json(new Response(500, "F").custom(error.message));
    }
};


  function convertData(inputData) {
    const convertedData = {
      first_name:inputData?.first_name||'',
      last_name:inputData?.last_name||"",
      contact_number:inputData?.contact_number,
      email:inputData?.email||"",
      password:inputData?.password||"",
      role:"user",
      image:inputData?.image?"https://gprop-demo-server.s3.ap-south-1.amazonaws.com/public/property/images/"+inputData?.image:"",
      state:"Mp",
      city:"chhindwara",
      zip_code:"480001",
      login_type:"google",
      is_email_verified:false,
      is_active:true,
      is_deleted:false,
    };
  
    return convertedData;
  }


  function convertPropertyData(inputData) {
    const convertedData = {
        user: "",
        name: "", 
        state: "mp", 
        city: inputData?.location || "",
        zip_code: "480001", 
        address: "", 
        status: 1, 
        show_verified: false,
        property_for: inputData?.property_for,
        coordinates: [parseFloat(inputData?.lat), parseFloat(inputData?.long)],
        location: inputData?.location || "",
        property_type: inputData?.property_type,
        saleable_area: inputData?.saleable_area || "",
        carpet_area: inputData?.carpet_area || '',
        saleable_area_size_in: inputData?.saleable_area_size_in || 'Feet',
        carpet_area_size_in: inputData?.carpet_area_size_in || 'Feet',
        additional_room: inputData?.additional_room ? JSON.parse(inputData?.additional_room):[],
        expected_price: parseFloat(inputData?.expected_price) || 0,
        expected_price_in_sqft: parseFloat(inputData?.expected_price_in_sqft) || 0,
        negotiable: inputData?.negotiable || false,
        booking_price: parseFloat(inputData?.booking_price)||0,
        monthly_rent: parseFloat(inputData?.monthly_rent)||0,
        security_deposit: parseFloat(inputData?.security_deposit)|| 0,
        maintance_charge: parseFloat(inputData?.maintance_charge)||0,
        available_from: new Date(inputData?.available_from),
        property_description: inputData?.description || "",
        open_side: inputData?.open_side || 0,
        facing_side: inputData?.facing_side || '',
        facing_road_width: parseFloat(inputData?.facing_road_width)||'',
        facing_road_width_in: inputData?.facing_road_width_in || 'Feet',
        images: inputData?.images?(JSON.parse(inputData?.images)||[]).map(item=>item.images?"https://gprop-demo-server.s3.ap-south-1.amazonaws.com/public/property/images/"+item.images:''):[],
        banner: inputData?.images?
        (JSON.parse(inputData?.images)||[]).filter(item=>item.make_display_image !== null)[0]?.images
        ?"https://gprop-demo-server.s3.ap-south-1.amazonaws.com/public/property/images/"+(JSON.parse(inputData?.images)||[]).filter(item=>item.make_display_image !== null)[0]?.images
        :"https://gprop-demo-server.s3.ap-south-1.amazonaws.com/public/property/images/"+(JSON.parse(inputData?.images)||[])[0]?.images:"",
        video: inputData?.video ? `https://gprop-demo-server.s3.ap-south-1.amazonaws.com/public/property/videos/${inputData?.video}`:"",
        // room_data: inputData?.room_data?JSON.parse(inputData?.room_data):[],
        bedrooms: parseInt(inputData?.bedrooms) || '',
        bathrooms: parseInt(inputData?.bathrooms) || '',
        balconies: parseInt(inputData?.balconies) || 0, 
        additional_facility: inputData?.additional_facility?inputData?.additional_facility?.split(","):[],
        property_status: inputData?.property_status || 'Ready_to_shift',
        property_age: parseInt(inputData?.property_age) || '',
        possession_date: new Date(inputData?.possession_date),
        furnishing_status: inputData?.furnishing_status || '',
        wardrobe: parseInt(inputData?.wardrobe)||0,
        beds: parseInt(inputData?.beds)||0,
        ac: parseInt(inputData?.ac)||0,
        tv: parseInt(inputData?.tv)||0,
        light: inputData?.light||'',
        fan: inputData?.fan||'',
        exhaust_fan: inputData?.exhaust_fan || "",
        boundary_wall: inputData?.boundary_wall || "",
        additional_furnishing: inputData?.additional_furnishing?inputData?.additional_furnishing?.split(","):[],
        other_facility: inputData?.other_facility || '',
        car_parking_open: parseInt(inputData?.car_parking_open) || 0,
        car_parking_close: parseInt(inputData?.car_parking_close) || 0,
        floor: parseInt(inputData?.floor) || 0,
        total_floor: parseInt(inputData?.total_floor) || 0,
        overlooking: inputData?.overlooking?inputData?.overlooking?.split(","):[],
        ownership_type: inputData?.ownershiptype || 'Freehold',
        living_room: inputData?.living_room || '',
        kitchen: inputData?.kitchen || '',
        master_bedroom: inputData?.master_bedroom || '',
        bathroom: inputData?.bathroom || '',
        balcony: inputData?.balcony || '',
        other_bedroom: inputData?.other_bedroom || '',
        preferred_tenants: inputData?.preferred_tenants || '',
        gender_preference: inputData?.gender_preference || '',
        maximum_tentants_allowed: inputData?.maximum_tentants_allowed || '',
        work_preference: inputData?.work_preference || '',
        food_preference: inputData?.food_preference || '',
        expected_duration_of_stay: inputData?.expected_duration_of_stay || '',
        special_requirement: inputData?.special_requirement || '',
        added_by_type: inputData?.added_by_type || 'Owner',
        views: parseInt(inputData?.views)||0, 
        admin_status: inputData?.admin_status || 'Pending',
        is_active: true,
        is_deleted: false,
    };

    return convertedData;
}
