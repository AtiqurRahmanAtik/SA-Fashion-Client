import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Products from "../Products/Products";

const Home = () => {

   const [item, setItem]= useState([]);
    // console.log(item);
   


    const axiosSecure = useAxiosSecure();
    axiosSecure.get('/product')
    .then(res=>{
       setItem(res.data);
    })
    .catch(error=>{
        console.log(error);
    })

   
    
    

    return (
        <div>
          <h1 className="text-3xl font-bold text-center">Discover Our Products : {item.length}</h1>

        
        {/* map here all product */}
        <div className="grid gap-3 my-9 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 ">
            {
                item.map((item)=> <Products key={item._id} item={item}></Products>)
            }
        </div>

        </div>
    );
};

export default Home;