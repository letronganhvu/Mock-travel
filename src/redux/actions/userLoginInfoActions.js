import * as types from "../constants";

export function setUserLoginInfo(userName, email, firstName, lastName, role, status, avatarUrl) {
  return {
    type: types.USER_LOGIN_INFO,
    payload: {
      "userName": userName,
      "email": email,
      "firstName": firstName,
      "lastName": lastName,
      "role": role,
      "status": status,
      "avatarUrl": avatarUrl
    }
  };
}

export function setTokenInfo(token) {
  return {
    type: types.TOKEN_INFO,
    payload: token
  };
}


