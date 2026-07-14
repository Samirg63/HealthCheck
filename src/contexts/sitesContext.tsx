import React, { createContext } from 'react'
import { SitesServices } from '../services/SitesServices'
import type { ISitesContext } from '../types/ISitesContext';



export const SitesContext = createContext<ISitesContext>({} as ISitesContext)
export const SitesProvider = ({children}: {children:React.ReactNode}) => {

const {loading,createSite,data,getHealth} = SitesServices();

  return (
    <SitesContext.Provider value={{loading,createSite,data,getHealth}}>
        {children}
    </SitesContext.Provider>
  )
}

