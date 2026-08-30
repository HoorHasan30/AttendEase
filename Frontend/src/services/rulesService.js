import api from './api'

async function getRules(){
    const response = await api.get('/rules')
    return response.data
}

async function setRules(formData){
    const response = await api.post('/rules/set-rules', formData)
}

async function updateRules(formData){
    const response = await api.put('/rules/update-rules', formData)
}

export {
    getRules,
    setRules,
    updateRules
}