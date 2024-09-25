import { useState, useEffect } from 'react';
import styles from './Menssagem.module.css'

function Menssagem({type, msg}) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        
        if(!msg) {
            setVisible(false)
            return
        }     
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        },3000)

        return () => clearTimeout(timer)

    },[msg])

   return (
       <>
            {visible && (
               <div className={`${styles.menssage} ${styles[type]}`}>{msg}</div>
            )}
       </>
   )
}

export default Menssagem;