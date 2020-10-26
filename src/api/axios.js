import axios from 'axios';
// axios.defaults.baseURL=process.env.VUE_APP_URL;
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : window.origin
axios.interceptors.request.use(config=>{
    return config;
});
axios.interceptors.response.use(response=>{
    return response.data;
},err=>{
    console.log(err);
})

export default axios;