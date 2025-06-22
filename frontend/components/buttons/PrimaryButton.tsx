"use client"
import { ReactNode } from "react"

export const PrimaryButton = ({children, onClick, size="small"} 
    : {
        children : ReactNode, 
        onClick : () => void , 
        size? : "big" | "small" 
    }) => {
    return <div className={`${size == "small" ? "text-sm" : "text-xl"}  ${size == "small" ? "px-8 pt-2" : "px-10 py-4"}  text-center cursor-pointer hover:shadow-md bg-amber-600 text-white rounded-full`} onClick={onClick}>
        {children}
    </div>
}