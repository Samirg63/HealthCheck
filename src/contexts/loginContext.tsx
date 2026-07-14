import React, { createContext, useEffect, useState } from 'react'
import type { ILoginContext } from '../types/loginContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthService } from '../services/AuthService';



export const loginContext = createContext<ILoginContext>({} as ILoginContext);

export const LoginProvider = ({children}: {children:React.ReactNode}) => {

  const [isLogged,setIsLogged] = useState<boolean>(false)
  const {getData,deleteData} = useLocalStorage();
  const {verifyToken} = AuthService();

  useEffect(()=>{
    const token = getData('token').token
    async function verifyTkn(){
      try {
        await verifyToken()    
      } catch (error) {
        deleteData('token')
      }
    }
    
    if(token){  
        verifyTkn()
        setIsLogged(true);     
    }
  },[])


  return (
    <loginContext.Provider value={{isLogged,setIsLogged}}>
        {children}
    </loginContext.Provider>
  )
}