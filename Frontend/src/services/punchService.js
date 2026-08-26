import api from './api'

async function uploadPunches(formData){
    const response = await api.post('/punches', formData)
}

async function calculateData(formData){
    const response = await api.post('/punches/calculate', formData)
}

export {
    uploadPunches,
    calculateData
}