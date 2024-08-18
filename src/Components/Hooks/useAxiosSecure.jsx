import axios from "axios";


 const axiosSecure = axios.create({
    baseURL: 'https://sa-fashion-server.vercel.app',
  
  });


const useAxiosSecure = () => {
    
    return axiosSecure;
};

export default useAxiosSecure;