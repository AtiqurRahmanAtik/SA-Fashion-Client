import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.Config";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


export const AuthContext = createContext(null);


const AuthProvider = ({children}) => {

    const [user,setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const googleProvider = new GoogleAuthProvider();



    // Register User
    const singUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    //  // SingIn 
    const singIn = (email,password)=> {
        setLoading(true)
        return  signInWithEmailAndPassword(auth, email, password)
      
    }

    // SingOut 
    const LogOut = ()=>{
        setLoading(true)
       return signOut(auth)
    }

    // GoogleLogin 
    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    //Observer
    useEffect(()=>{
       
        const unsubscribe = onAuthStateChanged(auth,(currenUser)=>{
           
            setUser(currenUser);
            console.log(currenUser);
            setLoading(false);

        });
        return () => {
          unsubscribe();
        };
      }, []);
   


    // authInfo
    const authInfo = {
        user,
        loading,
        singUp,
        singIn,
        googleLogin,
        LogOut,
      

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;