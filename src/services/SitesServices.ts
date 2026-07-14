import { useState } from "react"
import type { ISite } from "../types/ISite"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { IResult } from "../types/IResult";

export function SitesServices(){
    const url:string = import.meta.env.VITE_API_URL+'/sites'
    const {getData} = useLocalStorage();
    const userToken = getData('token').token
    const [loading,setLoading] = useState<boolean>(false);
    const [data,setData] = useState<{[index:string]:ISite}>({})
    
    async function getHealth(){          
        try {
            setLoading(true)
            
            const response = await fetch(url+'/health',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":"Bearer "+userToken
            }
            })
            const result:IResult<{[index:string]:ISite}> = await response.json();
            setData(result.data!)
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    async function createSite(siteData:{name:string,url:string}){
        try {
            setLoading(true);
            await fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":"Bearer "+userToken
                },
                body:JSON.stringify(siteData)
            })
            await getHealth();

        } catch (error) {
            console.error(error)
        }

    }

    async function update(siteData:Partial<{name:string,url:string,id:string}>){
        
        const {id, ...rest} = siteData
        
        try {
            setLoading(true)
            const response = await fetch(url+"/"+id,{
                method:"PUT",
                body:JSON.stringify(rest),
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization": "Bearer "+userToken
                }
            })

            const result:IResult<{name:string,url:string}> = await response.json();

            if(result.success){
                return result.data
            }else{
                throw result.errors[0]
            }
        } catch (error) {
            throw error
        }
        finally{
            setLoading(false)
        }
    }

    async function deleteSite(id:string){
        try {
            setLoading(true)
            
            const response = await fetch(url+'/'+id,{
                method:"DELETE",
                headers:{
                    "Authorization":"Bearer "+userToken
                }
            })

            const result:IResult<{}> = await response.json();

            if(result.success){
                return true;
            }else{
                throw result.errors[0]
            }

        } catch (error) {
            throw error
        } finally{
            setLoading(false)
        }
    }

    return {getHealth,data,createSite,loading,update,deleteSite}
}