const setRemenberMe = (isRemenberMe) => {
    localStorage.setItem('isRemenberMe', isRemenberMe);
    
};

const isRemenberMe = () => {
    if(localStorage.getItem('isRemenberMe') === null || localStorage.getItem('isRemenberMe') === undefined) {
    return true;
    }
    //convert String to boolean
    return JSON.parse(localStorage.getItem('isRemenberMe'));
}

const setItem = (key, value) => {
    if(isRemenberMe()) {
        localStorage.setItem(key, value);
    }else{
        sessionStorage.setItem(key, value);
    }
}

const getItem = (key) => {
    if(isRemenberMe()) {
        
        return localStorage.getItem(key);
    }else{
        
        return sessionStorage.getItem(key);
    }
}

const setToken = (token) => {
    setItem('token', token);
    
};

const getToken = () => {
    return getItem('token');
};

const setUserInfo = (userName, email, firstName, lastName, role, status) => {
    setItem('userName', userName);
    setItem('email', email);
    setItem('firstName', firstName);
    setItem('lastName', lastName);
    setItem('role', role);
    setItem('status', status);

};
const getUserInfo = () => {
    return {
        'userName': getItem('userName'),
        'email': getItem('email'),
        'firstName': getItem('firstName'),
        'lastName': getItem('lastName'),
        'role': getItem('role'),
        'status': getItem('status'),
    }

}

// export
const storage = { setRemenberMe, setToken, getToken, setUserInfo, getUserInfo, isRemenberMe }
export default storage;