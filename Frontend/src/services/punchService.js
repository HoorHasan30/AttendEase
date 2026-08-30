import api from './api'

async function uploadPunches(formData){
    const response = await api.post('/punches', formData)
}

async function calculateData(){
    const response = await api.post('/punches/calculate')
}

export {
    uploadPunches,
    calculateData
}