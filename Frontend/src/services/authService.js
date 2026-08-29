import api from './api'

async function registerCompany(formData){
    const response = await api.post('/auth/register-company', formData)
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user
}

async function registerHr(formData){
    const response = await api.post('/auth/register-hr', formData)
    return response.data
}

async function signIn(formData){
    const response = await api.post('/auth/sign-in',formData)
    localStorage.setItem('token', response.data.accessToken);
    return response.data.user
}

async function getCurrentUser(){
    const response = await api.get("/auth/me");
    return response.data;
}

async function getHr(){
    const response = await api.get("/auth/hr-list")
    return response.data
}

function logout(){
    localStorage.removeItem("token");
}

export {
  registerCompany,
  registerHr,
  signIn,
  getCurrentUser,
  logout,
  getHr
};

