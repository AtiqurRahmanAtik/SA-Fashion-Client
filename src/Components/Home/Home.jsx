import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Products from "../Products/Products";
import Dropdown from 'react-multilevel-dropdown';
import { useQuery } from "@tanstack/react-query";


const Home = () => {
    const [itemPerPage, setItemPerPage] = useState(8);
    const [currentPage, setCurrentPage ] = useState(1);
    const [filter, setFilter] = useState('');
    const [sort,setSort] = useState('');
    const [count, setCount]= useState(0);
    const [search,setSearch]= useState('');

    const [ asc, setAsc] = useState(true);
   const [item, setItem]= useState([]);
    // console.log(item);

    const [searching,SetSearching] = useState('');
    const [emptyProduct, SetEmptyProduct] = useState('');

    const axiosSecure = useAxiosSecure()
   

    // for higt to low button
    useEffect(()=>{

      axiosSecure.get(`/product?sort=${asc ? 'asc' : 'des'}&searching=${searching}`)
      .then(res=> setItem(res.data))
      
      .catch(err=>{
        console.log(err);
      })

    },[asc,searching])





    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()].map((num)=>num + 1);



    // concetual session 
    useEffect(()=>{
      const axiosSecure = useAxiosSecure();
      axiosSecure.get(`/all-product?page=${currentPage}&size=${itemPerPage}&$filter=${filter}&sort=${sort}&search=${search}`)
      .then(res=>{
         setItem(res.data);
        
      })
      .catch(error=>{
          console.log(error);
      })

    },[currentPage,filter,itemPerPage,sort,search])




  //  another fetch for count api
  
  useEffect(()=>{
    const axiosSecure = useAxiosSecure();
    axiosSecure.get('/product-count')
      .then(res=>{
        
         setCount(res.data.count)
      })
      .catch(error=>{
          console.log(error);
      })

  },[])

  // console.log(count)



    // handleSearching
    const handleSearch = (e)=>{
        e.preventDefault();
        const text = e.target.name.value;
        
        SetSearching(text);
        
       if(!text){

         SetEmptyProduct('Not available this product');
       }
       
    }
    

    // handle  of pagination button
    const handlePaginationButton = (val)=>{
      // console.log(val);
      setCurrentPage(val);
    }


    // handleReset Button 
    const handleReset = ()=>{
      setFilter('');
      setSort('');
    }
    

    // handleSearch
    const handleSearchButton = (e)=>{
      e.preventDefault();
      const text = e.target.search.value;
      console.log(text);
      
    }


    return (
        <div className="bg-gray-300">
        

          {/* searching button*/}
          <form onSubmit={handleSearch}>
          
            <input type="text" name="name" placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs my-3" />

            <input className="btn bg-green-400 hover:bg-orange-400 ml-2" type="submit" value="submit" />
          </form>


          {/* filter , sort */}
          <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select
            onChange={e=> setFilter(e.target.value)}
              name='category'
              id='category'
              value={filter}
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category BrandName</option>
              <option value='Smartphone'>Smartphone</option>

              <option value='Graphics Design'>Category </option>
              <option value='Digital Marketing'> Price Range</option>
            </select>
          </div>


        

          {/* sort  */}
          <div>
            <select
             onChange={e=> {setSort(e.target.value)
              setCurrentPage(1)
             }}
             name='sort'
             id='sort'
             value={sort}
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className='btn '>Reset</button>
        </div>


        {/* price button  */}
        
        <div className="my-2">
          <button onClick={()=> setAsc( !asc)}
          className="btn bg-green-500 text-black hover:bg-orange-400 text-2xl uppercase">
         { asc ? 'Price : High to low' : 'Price : Low to High' }
            </button>
        </div>

        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))} */}
        </div>
      </div>

        
      <h1 className="text-5xl font-bold text-center my-5 text-green-600">Our Latest Products </h1>

            <h1 className=" text-3xl text-red-400 font-bold text-center my-2">{emptyProduct}</h1>
        {/* map here all product */}
        <div className=" grid gap-3 my-9 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 ">
            {
                item.map((item)=> <Products key={item._id} item={item}></Products>)
            }
        </div>


        {/* previous button  */}
        <div className='flex justify-center mt-12 '>

        <button disabled={currentPage === 1}
        onClick={()=> handlePaginationButton(currentPage -1)}
         className='px-4 py-2 mx-1 bg-green-400 text-gray-700 disabled:text-gray-500 capitalize  rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1 '>previous</span>
          </div>
        </button>


            {/* number of pages */}
        {pages.map(btnNum => (
          <button
          onClick={()=> handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${currentPage === btnNum ? 'bg-blue-500 text-white ': ''} px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}


        {/* next button */}
        <button  disabled={currentPage === numberOfPages}
        onClick={()=> handlePaginationButton(currentPage + 1)}
        className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-green-400  rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1 '>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>

        </div>
    );
};

export default Home;