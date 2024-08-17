import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Products from "../Products/Products";

const Home = () => {
    const [itemPerPage, setItemPerPage] = useState(8);
    const [currentPage, setCurrentPage ] = useState(1);
    const [count, setCount]= useState(0);
    
   const [item, setItem]= useState([]);
    // console.log(item);


    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()].map((num)=>num + 1);


    useEffect(()=>{
      const axiosSecure = useAxiosSecure();
      axiosSecure.get(`/all-product?page=${currentPage}&size=${itemPerPage}`)
      .then(res=>{
         setItem(res.data);
        
      })
      .catch(error=>{
          console.log(error);
      })

    },[currentPage,itemPerPage])




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
        const search = e.target.name.value;
        console.log(search)
    }
    

    // handle  of pagination button
    const handlePaginationButton = (val)=>{
      console.log(val);
      setCurrentPage(val);
    }

    return (
        <div>
          <h1 className="text-3xl font-bold text-center">Discover Our Products : </h1>

          {/* searching */}
          <form onSubmit={handleSearch}>
          
            <input type="text" name="name" placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs my-3" />

            <input className="btn bg-green-400 ml-2" type="submit" value="submit" />
          </form>


          {/* filter , sort */}
          <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
            </select>
          </div>

          <form>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white input input-bordered input-success outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Search Here'
                aria-label='Enter Job Title'
              />

              <button className='px-1 ml-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button className='btn'>Reset</button>
        </div>
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))} */}
        </div>
      </div>

        
        {/* map here all product */}
        <div className="grid gap-3 my-9 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 ">
            {
                item.map((item)=> <Products key={item._id} item={item}></Products>)
            }
        </div>


        {/* previous button  */}
        <div className='flex justify-center mt-12'>

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
        <button disabled={currentPage === numberOfPages}
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