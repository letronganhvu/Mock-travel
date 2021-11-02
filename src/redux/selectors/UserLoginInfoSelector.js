import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const userLoginInfoSelector = (state) => state.UserLoginInfo;

const selectUserInfoSelector = createSelector(
    userLoginInfoSelector,
    state => state.userInfo);

const selectTokenSelector = createSelector(
    userLoginInfoSelector,
    state => state.token);

const selectFullNameSelector = createSelector(
    selectUserInfoSelector,
    state => state.firstName + " " + state.lastName);
const selectAvatarUrlSelector = createSelector(
    userLoginInfoSelector,
    state => state.avatarUrl);

/** function */
export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
}

export const selectToken = (state) => {
    return selectTokenSelector(state);
}
export const selectFullName = (state) => {
    return selectFullNameSelector(state);
}

export const selectAvatarUrl = (state) => {
    return selectAvatarUrlSelector(state);
}

