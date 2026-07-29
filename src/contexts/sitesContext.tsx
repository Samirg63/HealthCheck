//Libs
import React, { createContext } from 'react'

//Services
import { SitesServices } from '../services/SitesServices'

//Types
import type { ISitesContext } from '../types/ContextTypes/ISitesContext';


export const SitesContext = createContext<ISitesContext>({} as ISitesContext)

export const SitesProvider = ({children}: {children:React.ReactNode}) => {

const {loading,createSite,data,getHealth} = SitesServices();

  return (
    <SitesContext.Provider value={{loading,createSite,data,getHealth}}>
        {children}
    </SitesContext.Provider>
  )
}

