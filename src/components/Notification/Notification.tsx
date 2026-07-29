//Icons
import { FaCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";

//Styles
import style from './Notification.module.css'


type Props = {
    message:string,
    success:boolean,
    title?:string
}

const Notification = ({message,success,title}:Props) => {


    const pickTitle = ():string=>{
        if (title) return title ;

         switch (success) {
            case true:
                return "Sucesso"
            case false:
                return "Algo deu errado"
   
        }
    }


  return (
    <div className={`relative boxShadow bg-[#fff]  rounded-lg w-90  ${style.notificationSingle}`}>
        <div className={`
            ${
                (!success)?
                    "border-error bg-error/40"
                :
                    "border-success bg-success/40"
            }
            border-b  rounded-tl-[inherit] rounded-tr-[inherit] px-4 py-1 flex items-center gap-2`}>
                {
                    (!success)?
                        <MdErrorOutline size={20} className="mb-0.5" color="#460809"/>
                    :
                        <FaCheck size={20} className="mb-0.5" color="#032e15"/>

                }
            <h6 className={`
                ${
                    (!success)?
                        "text-red-950"
                    :
                        "text-green-950"
                }
                 font-semibold`}>
                    {
                        pickTitle()
                    }
                    </h6>
        </div>
        <div className="px-4 py-2 rounded-bl-[inherit] rounded-br-[inherit] bg-white">
            <span className="text-zinc-700">
                {message}
            </span>
        </div>
    </div>
  )
  
}

export default Notification