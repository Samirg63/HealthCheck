import React from 'react'
import styles from './Container.module.css'

type Props = {
    children:React.ReactNode
}

const Container = ({children}: Props) => {

  return (  
    <section className={`${styles.container} w-full border border-lightGray h-[85vh] rounded-2xl relative overflow-y-hidden`}> 
        {children}
    </section>    
  )
}

export default Container