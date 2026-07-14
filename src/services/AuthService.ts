
import { useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { IResult } from '../types/IResult';
import { SitesContext } from '../contexts/sitesContext';



export function AuthService(){

    const url:string = import.meta.env.VITE_API_URL+'/auth';
    const {setData} = useLocalStorage()
    const {getHealth} = useContext(SitesContext)


    async function login(authData:{email:string,password:string}){       
        
            const response:IResult<{token:string}> = await fetch(url+'/login',{
                method:"POST",
                body:JSON.stringify({
                    email:authData.email,
                    password:authData.password
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(res=>res.json())
            
            if(response.success){
                
                setData('token',response.data!)
                await getHealth(response.data!.token)
                return response.data
            }else{
                throw response.errors[0]
            }
              
    }

    async function verifyToken(tkn?:string):Promise<boolean>{
        const {getData} = useLocalStorage()
        const token = tkn ? tkn : getData('token').token;


        try {
            const response = await fetch(url+'/verify',{
                method:"POST",
                headers:{
                    "Authorization":"Bearer "+token
                }
            })

            const result = await response.json()

                
            if(!result.success){
                throw result.errors[0]
            }
              
            return result.success

        } catch (error) {
            throw error
        }

    }

    return {login,verifyToken}

}