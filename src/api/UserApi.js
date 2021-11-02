import Api from './Api';

const url = "/users";

const existsByEmail = (email) => {
    return Api.get(`${url}/email/${email}`);
};

const existsByUserName = (userName) => {
    return Api.get(`${url}/userName/${userName}`);
};
const create = (firstName, lastName, userName, email, password) => {
    
    const body = {
        userName: userName,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName

    }
    
    return Api.post(url, body);
};

const resendEmailToActiveAccount = (email) => {
    const parameters = {
        email: email,
    }

    return Api.get(`${url}/userRegistrationConfirmRequest`, {params: parameters});
};

const resetPasswordRequest = (email) => {
    const parameters = {
        email: email,
    }

    return Api.get(`${url}/resetPassword/request`, {params: parameters});
};

const resendEmailToResetPassword = (email) => {
    const parameters = {
        email: email,
    }

    return Api.get(`${url}/resetPassword/resend`, {params: parameters});
};

const resetPassword = (token, newPassword) => {
    const parameters = {
        token: token,
        newPassword: newPassword
    }

    return Api.get(`${url}/resetPassword`, {params: parameters});
};

const getProfile = () => {


    return Api.get(`${url}/profile`);
};

const updateProfile = (avatarUrl) => {

    const body = {
        avatarUrl: avatarUrl,
       

    }

    return Api.put(`${url}/profile`, body);
};


// export
const userApi = {updateProfile, getProfile, existsByEmail, existsByUserName, create, resendEmailToActiveAccount, resetPasswordRequest, resendEmailToResetPassword, resetPassword }
export default userApi;

