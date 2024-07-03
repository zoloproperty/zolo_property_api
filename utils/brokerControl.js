const ZIP_ROLE = "broker";
exports.brokerControl = (query, role = "user", zipCode = []) => {
  if (role == ZIP_ROLE && zipCode) {
    query.$or = [
      ...(query.$or || []),
      ...zipCode.map(zip => ({
        zip_code: (zip || "").toString() || 480001
      }))
    ];
  }
};
