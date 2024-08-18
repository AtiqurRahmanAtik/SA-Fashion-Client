import { Outlet, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";


const Main = () => {
    const noHeaderFooter = useLocation().pathname.includes('login') || useLocation().pathname.includes('register');
    // console.log(noHeaderFooter);


    return (
        <div>
        {!noHeaderFooter && <NavigationBar></NavigationBar>}

          <div className="container mx-auto my-11">
          <Outlet></Outlet>
          </div>

          {!noHeaderFooter &&  <Footer></Footer>}
        </div>
    );
};

export default Main;