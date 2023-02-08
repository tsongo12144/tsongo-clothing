import { createContext,useState } from "react";

//actual value we wannna access
export const UserContext=createContext({
currentUser:null,
setcurrentUser:()=>null
});

export const UserProvider=({children})=>{
const [currentUser,setcurrentUser]=useState(null);
const value={currentUser,setcurrentUser};
return <UserContext.Provider value={value}>  
{children}
</UserContext.Provider>
}