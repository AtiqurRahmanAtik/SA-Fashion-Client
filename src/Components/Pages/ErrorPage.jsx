import { Link, useRouteError } from "react-router-dom";


const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
     
             <div >
      <h1 className="text-3xl font-bold text-red-600">Oops!</h1>
      <p className="text-2xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-2xl">
        <i >{error.statusText || error.message}</i>
      </p>

     <Link to='/'> <button className="btn bg-green-600 text-2xl text-white mt-10">Back Home Page</button></Link>
    </div>
       
    );
};

export default ErrorPage;