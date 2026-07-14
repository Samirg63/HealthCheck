import React, { useEffect, useRef, useState } from "react";

//Hooks
import { useClickAway } from "../../hooks/useClickAway.ts";

//icons
import { BsThreeDots } from "react-icons/bs";

//Components
import RedDot from "./RedDot";

//Styles
import styles from './APIDots.module.css'
import type { IAPIs } from "../../types/IAPIs";
import GreenDot from "./GreenDot";

type Props = {
    APIs:IAPIs[]
}

const APIDots = ({APIs}:Props) => {

    const [APIsContainerVisibility, setAPIsContainerVisibility] = useState<boolean>(false)
    const ApiContainerRef = useRef<HTMLDivElement>(null)
    const [hasErrors,setHasErrors] = useState<boolean>(false)

    function handleAPIContainerVisibility(){
        setAPIsContainerVisibility(!APIsContainerVisibility)
    }

    useClickAway(ApiContainerRef as React.RefObject<HTMLElement>,()=>{
        setAPIsContainerVisibility(false);
    })

    useEffect(()=>{
        
        APIs.map((api:IAPIs)=>{
            Object.keys(api).map((key:string)=>{
                if(!api[key].success){
                    setHasErrors(true)
                }
            })
        })
    })

  return (
    <div className="relative inline " ref={ApiContainerRef} data-testid="apiDots">

    <button data-testid="ApiContainerBtn" className="cursor-pointer ml-6.75 relative" onClick={handleAPIContainerVisibility}>
        <BsThreeDots size={26}/>
        {
            (hasErrors)&&
            <div className="bg-red-700 rounded-full absolute inline  px-2.5 scale-75 -top-1/2 -right-1/2">
                <span className="text-white text-[12px] font-semibold ">!</span>
            </div>
        }
    </button>
    {
        (APIsContainerVisibility) &&
        <section  data-testid="apiContainer" className={`${styles.shadow} bg-white border  border-lightGray w-40 absolute py-1 px-2 rounded-xl left-8 top-6 z-99`}>
            <ul className="space-y-1">
                {
                    APIs.map((data:{[index:string]:{success:boolean}},index:number)=>(
                        <li className="flex items-center justify-between" key={index}>
                            <span>{Object.keys(data)[0]}</span>
                            {
                                (data[Object.keys(data)[0]].success)?
                                <GreenDot></GreenDot>
                                :
                                <RedDot></RedDot>
                            }
                        </li>
                    ))
                }
                
            </ul>
        </section>
        }
    </div>
  )
}

export default APIDots