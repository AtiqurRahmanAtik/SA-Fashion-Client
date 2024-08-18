import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {

    const {singIn,googleLogin}= useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e)=> {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const LoginInfo = { email, password};
        console.log(LoginInfo);

        singIn(email,password)
        .then(result=>{
            console.log(result)
                
                Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: "Register Successful",
                       showConfirmButton: false,
                       timer: 1500
                     });
    
                     navigate('/');
                   })
                   .catch(error=>{
                     console.log(error);
                   })
    
    
        }
    

        const handleGoogle = ()=>{
            googleLogin()
            .then(result=>{
                console.log(result.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Google Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
    
                navigate('/')
                //   navigate(from, { replace: true });
            })
            .catch(error=> {
                console.log(error);
            })
        }


       
    

    return (
        <div>
                <div>
          <div className="hero ">
  <div className="hero-content flex-col lg:flex-col">

    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
     
    </div>

    {/* From */}
    <div className="card bg-orange-300  w-[800px]   shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>

          <input type="email" placeholder="email" name="email" className="input input-bordered" required />

        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" name="password" className="input input-bordered" required />
        
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>

      <button  onClick={handleGoogle} className="btn w-2/4 mx-auto"> <FcGoogle className="text-4xl"></FcGoogle> <span className="text-4xl">Google</span> </button>

      <h1>Do Have An Account? please  <Link to='/register'> <button className="btn btn-link">Register</button></Link></h1>
    </div>
  </div>
</div>
        </div>
        </div>
    );
};

export default Login;