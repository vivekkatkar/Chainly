"use client"
import { ReactNode } from "react"

export const DarkButton = ({children, onClick, size="small"} 
    : {
        children : ReactNode, 
        onClick : () => void , 
        size? : "big" | "small" 
    }) => {
    return <div className={" flex flex-col justify-center px-8 py-2 text-center cursor-pointer hover:shadow-md bg-purple-700 text-white rounded"} onClick={onClick}>
        {children}
    </div>
}