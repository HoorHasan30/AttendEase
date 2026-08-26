import api from './api'

async function getAllCompanyRecords(formData){
    const response = await api.get('/records', formData)
    return response.data
}

async function dashboardData(formData){
    const response = await api.post('/records/dashboard', formData)
    return response.data
}

export {
    getAllCompanyRecords,
    dashboardData
}