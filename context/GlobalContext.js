import { useState , useContext , useEffect, createContext } from "react";

import {getCurrentUser} from "../lib/appwriter" 

const GlobalContext = createContext();


//Instead of writing useContext(GlobalContext) every time, we define a custom hook:

export const useGlobalContext = () => useContext(GlobalContext);



//components that will wrap everthings 

const GlobalProvider = ({children}) => {
    
    //status of user auth
    const [isLogedin , setIsLogedin] = useState(false);

    //status of the use data
    const [user , setUser] = useState(null);

    //isLoading
    const [isLoding , setIsLoding] = useState(false);


    //only happend at start
    useEffect(()=> {
        
        //return Promise
        getCurrentUser()
            .then((res) =>{
                if(res){

                    setIsLogedin(true);
                    setUser(res);

                }else{
                    setIsLogedin(false);
                    setUser(null);
                }

            }).catch((e)=>{
                console.log("Error From Global Context",e)
            }).finally(()=>{
                setIsLoding(false);
            })


    } , []);
    
    return (
        <GlobalContext.Provider
                value={{
                    isLogedin,setIsLogedin,
                    user , setUser ,
                    isLoding , setIsLoding
                }}
            >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider ; 