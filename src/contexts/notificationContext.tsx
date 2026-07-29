//Libs
import { createContext, useState } from "react"

//Types
import type { INotification } from "../types/INotification"
import type { INotificationContext } from "../types/ContextTypes/INotificationContext"

//Components
import Notification from "../components/Notification/Notification"

export const NotificationContext = createContext<INotificationContext>({} as INotificationContext)
export const NotificationProvider =  ({children}: {children:React.ReactNode}) => {
    const [notifications, setNotifications] = useState<INotification[]>([])

    var timeout:number|undefined;

    const newNotification = (message:string, success:boolean,title?:string)=>{
        clearTimeout(timeout)
        const index = notifications.length

        setNotifications([...notifications,{
            index:index,
            message:message,
            success:success,
            title:title
        }])

        timeout = setTimeout(() => {setNotifications([])

        }, 4000);
    }
 
    return (
    <NotificationContext.Provider value={{newNotification}}>
        <div className="fixed top-12 right-6 z-99 space-y-2">
        {
            notifications.map((data:INotification)=>(
                <Notification message={data.message} key={data.index} success={data.success}/>
            )
                
            
            )
        }
        </div>
        {children}
    </NotificationContext.Provider>
  )
}

