export const HOST = "http://localhost:3005";

const AUTH_ROUTE = `${HOST}/api/user`;
const MESSAGES_ROUTE = `${HOST}/api/messages`;
const CLOUDINARY_ROUTE = `${HOST}/api/cloudinary`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;
export const ADD_USER_ROUTE = `${AUTH_ROUTE}/add-user`;
export const UPDATE_USER_ROUTE = `${AUTH_ROUTE}/update-user`;
export const GET_ALL_USERS = `${AUTH_ROUTE}/get-allUsers`;

export const ADD_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/add-message`;
export const ADD_IMAGE_ROUTE = `${MESSAGES_ROUTE}/add-image`;
export const GET_MESSAGE_ROUTE = `${MESSAGES_ROUTE}/get-messages`;
export const GET_MESSAGE_LIST_ROUTE = `${MESSAGES_ROUTE}/get-message-list`;

export const GET_SIGNATURE_ROUTE = `${CLOUDINARY_ROUTE}/getSignature`;
