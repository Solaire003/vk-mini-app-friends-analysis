import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://api.vk.com/method/',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
});

export default Axios