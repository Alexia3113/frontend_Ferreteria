import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://localhost:4000/api',
    baseURL:import.meta.env.VITE_URL_FERRE+"/api",
    withCredentials: true
});

export default instance;