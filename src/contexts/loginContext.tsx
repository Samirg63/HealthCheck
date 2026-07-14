import React, { createContext, useContext, useEffect, useState } from 'react'
import type { ILoginContext } from '../types/loginContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AuthService } from '../services/AuthService';
import { SitesContext } from './sitesContext';



export const loginContext = createContext<ILoginContext>({} as ILoginContext);

export const LoginProvider = ({children}: {children:React.ReactNode}) => {

  const [isLogged,setIsLogged] = useState<boolean>(false)
  const {getData,deleteData} = useLocalStorage();
  const {verifyToken} = AuthService();
  const {getHealth} = useContext(SitesContext)

  useEffect(()=>{
    const token = getData('token').token
    async function verifyTkn(){  
       
      try {
        await verifyToken()
        setIsLogged(true)
        await getHealth();
      } catch (error) {

        deleteData('token')
      }
      
    }
    
    if(token){  
        verifyTkn()
    }
  },[])


  return (
    <loginContext.Provider value={{isLogged,setIsLogged}}>
        {children}
    </loginContext.Provider>
  )
}