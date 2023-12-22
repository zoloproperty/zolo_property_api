function authHandler(typeProp) {
  const authObj = {
    AUTH_SUCCESS: 'Authentication successful.',
    AUTH_FAILED: 'Authentication failed.',

    // Inactive
    INACTIVE_ACCOUNT: 'Your account is inactive. Please contact the administrator.',
    DELETED_ACCOUNT: 'Your account has been deleted. Please contact the administrator.',

    // JWT Token
    JWT_NEEDED: 'Empty JWT field in headers.',
    JWT_INVALID: 'Invalid JWT passed in headers.',
    JWT_EXPIRED: 'Expired JWT passed in headers.',

    // Token
    TOKEN_REQUIRED: 'Authentication token is required.',
    TOKEN_INVALID: 'Invalid authentication token passed.',
    TOKEN_EXPIRED: 'Your session has expired. Kindly log in again.',

    // Invalid
    INVALID_USER_NAME: 'Input user name is invalid.',
    INVALID_EMAIL: 'Input email is invalid.',
    INVALID_PASSWORD: 'Input password is invalid.',
    PASSWORD_NOT_MATCH: "Old password doesn't match.",
    INVALID_CRED: `Unable to login, invalid credentials.`,

    // Not found | registered
    UNIQUE_ID_NOT_FOUND: 'Unique Id not found.',
    EMAIL_NOT_FOUND: 'Email not found.',
    CRED_NOT_FOUND: 'Credentials not found.',
    PHONE_NOT_FOUND: 'Mobile number not found.',
    ACCOUNT_NOT_FOUND: `Account not found.`,
    EMAIL_MOB_NOT_REGISTERED: 'Email or Mobile Number not registered.',

    // Duplicates
    DUPLICATE: `Duplicate entry found.`,
    DUPLICATE_EMAIL_PHONE: 'Duplicate email and phone found.',
    DUPLICATE_EMAIL: 'Duplicate email found.',
    DUPLICATE_PHONE: 'Duplicate phone number found.',
    DUPLICATE_USER_NAME: 'Duplicate user name found.',

    UNABLE_EMAIL: `Unable to create, duplicate email found.`,
    UNABLE_PHONE: `Unable to create, duplicate mobile number found.`,
    UNABLE_USER_NAME: `Unable to create, duplicate name found.`,
    UNABLE_EMAIL_PHONE: `Unable to create, duplicate email and mobile number found.`,
    UNABLE_PAN: 'Duplicate PAN card details found.',

    // Already Exist
    NAME_EMAIL_PHONE_EXIST: `Unable to create, email, phone, and username already exist.`,
    EMAIL_PHONE_EXIST: `Unable to create, email and phone already exist.`,
    EMAIL_EXIST: `Unable to create, Email already exists.`,
    USER_NAME_EXIST: `Unable to create, Username already exists.`,
    MOBILE_EXIST: `Unable to create, Mobile number already exists.`,

    // E-Mail
    OTP_MAIL_SENT: 'OTP sent to registered email address.',

    // Mobile
    OTP_SENT: 'OTP sent to registered mobile number.',
    OTP_TEMP: 'Please enter OTP to change password.',
    INVALID_OTP: 'Invalid OTP. Please enter a valid OTP.',

    // Changed
    CHANGE_PASSWORD: 'Password changed successfully.',

    // Signup
    SIGNUP: 'User created successfully.',
    SIGNUP_FAILED: 'Could not create a new user. Please try again.',

    // Login
    DATA_FOUND: 'Data found.',

    // Not Exists
    EMAIL_NOT_EXISTS: 'Email ID does not exist.',
    USER_NOT_EXISTS: 'User does not exist.',

    // Something went wrong
    WRONG: 'Something went wrong.',
    WRONG_PASS: 'Incorrect password entered.',
    USER_LIST_WRONG: 'Error while fetching user list.',
    TOTAL_WRONG: 'Error while fetching total count.',
    FAILED_DELETE_USER: 'Error while deleting user.',
    FAILED_DELETE_CAT: 'Failed to delete category.',

    // Category
    CATEGORIES_NOT_AVAIL: 'Categories data not available.',
    CAT_ADDED: 'Category added successfully.',
    CAT_ADD_FAILED: 'Could not add category.',
    CAT_UPD: 'Category data updated successfully.',
    CATEGORY_NOT_EXISTS: 'Category does not exist.',
    DUPLICATE_CATEGORY_EXISTS: 'Category already exists.',
    CAT_UPD_FAILED: 'Category update failed.',
    CAT_DELETED: 'Category deleted successfully.',
    CAT_ACTIVATED: 'Category activated successfully.',
    CAT_DEACTIVATED: 'Category deactivated successfully.',
    // Sub Category
    CATEGORIES_NOT_AVAIL: 'Categories data not available.',
    FAILED_DELETE_SUB_CAT: 'Failed to delete sub category.',
    SUB_CAT_ADDED: 'Sub category added successfully.',
    SUB_CAT_ADD_FAILED: 'Could not add sub category.',
    SUB_CAT_UPD: 'Sub category data updated successfully.',
    SUB_CATEGORY_NOT_EXISTS: 'Category does not exist.',
    DUPLICATE_SUB_CATEGORY_EXISTS: 'Sub category already exists.',
    SUB_CAT_UPD_FAILED: 'Sub category update failed.',
    SUB_CAT_DELETED: 'Sub category deleted successfully.',
    SUB_CAT_ACTIVATED: 'Sub category activated successfully.',
    SUB_CAT_DEACTIVATED: 'Sub category deactivated successfully.',

    //products
    PRODUCT_ADDED : "Product added successfully.",
    PRODUCT_UPDATED : "Product updated successfully.",
    PRODUCT_ADD_FAILED : "Product added failed.",
    PRODUCT_DELETED : "Product deleted successfully.",
    FAILED_DELETE_PRODUCT : "Product deleted failed.",
    DUPLICATE_PRODUCT_EXISTS : "Product already exists.",
    PRODUCT_UPD_FAILED : "Product update failed.",
    PRODUCT_ACTIVATED : "Product activated successfully.",
    PRODUCT_INACTIVE : "Product deactivated successfully.",

    //EMI
    DUPLICATE_EMI_EXISTS : "EMI value already exists, please try another value.",
    EMI_NOT_EXISTS : "EMI value not exists, please try again.",
    EMI_UPD : "EMI value updated successfully.",
    EMI_ACTIVATED : "EMI category activated successfully.",
    EMI_DEACTIVATED : "EMI category deactivated successfully.",
    EMI_UPD_FAILED : "Failed to update tax value.",
    EMI_ADDED : "EMI value added successfully.",
    EMI_ADD_FAILED : "Something went wrong when adding tax.",
    EMI_DELETED : "EMI deleted successfully.",
    FAILED_DELETE_EMI : "Something went wrong when deleting the tax.",

    // Image
    NO_FILE: 'No file uploaded.',

    // User
    USER_UPDATED: 'User updated successfully.',
    USER_UPDATED_FAILED: 'User update failed.',
    USER_DELETED: 'User deleted successfully.',
    USER_ACTIVATED: 'User activated successfully.',
    USER_DEACTIVATED: 'User deactivated successfully.',
  };

  return authObj[typeProp];
}

module.exports = { authHandler };
