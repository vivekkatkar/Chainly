"use client"
import { ReactNode } from "react"

export const SecondaryButton = ({children, onClick, size="small"} 
    : {
        children : ReactNode, 
        onClick : () => void , 
        size? : "big" | "small" 
    }) => {
    return <div className={`${size == "small" ? "text-sm" : "text-xl"}  ${size == "small" ? "px-8 pt-2" : "px-10 py-4"} cursor-pointer hover:shadow-md border text-black rounded-full`} onClick={onClick}>
        {children}
    </div>
}