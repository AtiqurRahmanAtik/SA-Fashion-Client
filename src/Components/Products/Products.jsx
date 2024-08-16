

const Products = ({item}) => {
    // console.log(item);
    const {ProductName,BrandName,ProductImage,Description,Price,Category,Ratings,ProductCreationDateTime} = item;


    return (
        <div>
            
            <div class="max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div class="px-4 py-2">
        <h1 class="text-xl font-bold text-gray-800 uppercase dark:text-white">{ProductName}</h1>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">{Description}</p>
    </div>

   
        <img src={ProductImage} class="object-cover w-full h-48 mt-2" alt="NIKE AIR" />
    <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
        
        <h1 class="text-lg font-bold text-white">${Price}</h1>
        <h1 class="text-lg font-bold text-white">{Category}</h1>
       
    </div>

    <div class="flex items-center justify-between px-4 py-2 ">
        
        <h1 class="text-lg font-semibold ">${Ratings}</h1>
        <h1 class="text-lg font-semibold ">{ProductCreationDateTime}</h1>
       
    </div>

    <button class="px-2 btn my-1 bg-green-400 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">Add to cart</button>
</div>
        </div>
    );
};

export default Products;