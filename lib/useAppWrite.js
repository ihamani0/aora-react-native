import { useEffect, useState } from "react";

const useAppWrtie = (fn) =>{
    

    //state for data and loading
    const [data, setData] = useState([]);
    
    const [isLoading, setisLoading] = useState(false);

    //fucntion to ftech data 
    const ftechData = async ()=>{
        setisLoading(true)
        try {
            const response = await fn();
            setData(response)
        } catch (error) {
            Alert.alert(error.message)
        } finally{
            setisLoading(false);
        }
    }


    useEffect(()=>{
        ftechData();
    } , [])

    //fucntion to Re-ftech data 
    const reFetchPosts = () => ftechData();


    return {data , reFetchPosts , isLoading}
}

export default useAppWrtie ;