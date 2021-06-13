import axios from 'axios'

const apiURL = 'http://localhost:3000/api'
const authAxios = axios.create({
    baseURL: `${apiURL}/`
})

authAxios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token")
    if (token) config.headers["Authorization"] = token
    return config
})

export default authAxios
