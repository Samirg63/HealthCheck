//Libs
import { useContext, useState } from "react"

//Types
import type { ISite } from "../types/ISite"
import type { IResult } from "../types/IResult";
import type { INotificationContext } from "../types/ContextTypes/INotificationContext";

//Hooks
import { useLocalStorage } from "../hooks/useLocalStorage"

//Contexts
import { NotificationContext } from "../contexts/notificationContext";


export function SitesServices(){
    const url:string = import.meta.env.VITE_API_URL+'/sites';

    const {newNotification} = useContext<INotificationContext>(NotificationContext)
    const {getData} = useLocalStorage();
    const userToken = getData('token').token
    const [loading,setLoading] = useState<boolean>(false);
    const [data,setData] = useState<ISite>({})
    
    async function getHealth(token?:string){   
        const usedToken = token ? token : userToken

        
        try {
            setLoading(true)
            
            const response = await fetch(url+'/health',{
            method:"GET",
            headers:{
                "Content-Type":"Application/json",
                "Authorization":"Bearer "+usedToken
            }
            })
            const result:IResult<ISite> = await response.json();
            setData(result.data!)
        } catch (error) {
            console.error(error)
        }
        finally{
            setLoading(false)
        }
    }

    async function createSite(siteData:{name:string,url:string}){
        
            setLoading(true);
            await fetch(url,{
                method:'POST',
                headers:{
                    "Content-Type":"Application/json",
                    "Authorization":"Bearer "+userToken
                },
                body:JSON.stringify(siteData)
            })
            .then(res => res.json())
            .then(async (result)=>{
                if(!result.success){
                    throw result.errors
                       
                }
                    newNotification('Site adicionado com sucesso!',true)
                    await getHealth();
                
            })
            .catch((error)=>{
                if((error as any)[0].status == 422){
                    newNotification("Preencha todos os campos corretamente!",false)
                    setLoading(false)
                    return;
                }

                newNotification('Erro ao adicionar site!',false)
            })
            

    }

    async function update(siteData:Partial<{name:string,url:string,id:string}>){
        
        const {id, ...rest} = siteData

        if(rest.name == '' || rest.url == ""){
            newNotification("Preencha todos os campos corretamente!",false)
            return;
        }
        
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
            newNotification('Erro ao editar site!',false)
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

            if(!result.success){
                throw result.errors[0]
            }
            
            newNotification('Site apagado com sucesso!',true)

        } catch (error) {
            newNotification("Erro ao apagar o site! tente novamente", false)
        } finally{
            setLoading(false)
        }
    }

    return {getHealth,data,createSite,loading,update,deleteSite}
}