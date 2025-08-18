import http from "./httpService";


export async function signupApi(data) {
    return http.post(`/user/signup`, data).then(({ data }) => data)
}
export async function signinApi(data) {
    return http.post('/user/signin', data).then(({ data }) => data)
}
export async function getUserApi(options) {

    return http.get(`/user/profile`, options).then(({ data }) => data);
}

export async function getAlluserApi(options) {
    
    return http.get(`/user/list`, options).then(({ data }) => data.data);
}

const userAuth = {
    signupApi,
    signinApi,
    getUserApi,
    getAlluserApi

};

export default userAuth;