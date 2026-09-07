//Libs
import { useContext } from 'react';

//Types
import type { IResult } from '../types/IResult';
import type { ILoginContext } from '../types/loginContext';

//Hooks
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCookie } from '../hooks/useCookies';

//Contexts
import { SitesContext } from '../contexts/sitesContext';
import { loginContext } from '../contexts/loginContext';



export function AuthService(){

    const url:string = import.meta.env.VITE_API_URL+'/auth';
    const {setData} = useLocalStorage()
    const {getHealth} = useContext(SitesContext)
    const {setCookie,deleteCookie} = useCookie()
    const {setIsLogged} = useContext<ILoginContext>(loginContext)
    const {deleteData} = useLocalStorage(); 


    async function login(authData:{email:string,password:string,maintain:boolean}){       
        
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
                if(authData.maintain){
                    setCookie('userData',{email:authData.email,password:authData.password,maintain:true})
                }else{
                    deleteCookie('userData')
                }
                setData('token',response.data!)
                getHealth(response.data!.token)
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

    function logout(){
        deleteData('token')
        setIsLogged(false);
    }

    return {login,verifyToken,logout}

}