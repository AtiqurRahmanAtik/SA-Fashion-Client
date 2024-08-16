import { useQuery } from "@tanstack/react-query";


const useProduct = () => {

     const { isPending, error, data: item=[] } = useQuery({
        queryKey: ['item'],
        queryFn : async ()=>{
            const res = await axiosSecure.get('/product')
            return res.data;
        }
    })
    return [item,isPending];
        
};

export default useProduct;