"use client"
import { ReactNode } from "react"

export const LinkButton = ({children, onClick} : {children : ReactNode, onClick : () => void }) => {
    return <div className="px-2 py-2 rounded flex justify-center  cursor-pointer hover:bg-slate-100 font-light font-light" onClick={onClick}>
        {children}
    </div>
}