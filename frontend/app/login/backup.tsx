"use client"

import { Appbar } from "@/components/Appbar"
import { PrimaryButton } from "@/components/buttons/PrimaryButton"
import CheckFeature from "@/components/CheckFeature"
import { Input } from "@/components/Input"
import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config/config"
import { useRouter } from "next/navigation"

export default function Login(){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function onSubmit(){
         try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                "username": email,
                "password": password
            });

            // console.log(res);
            if(res.status == 200){
                localStorage.setItem("token", res.data.token);
                alert(res.data.token);
                router.push("/home");
            }else{
                alert("error :- ");
            }
       }catch(e : any){
        alert(e.message);
        console.log(e.message);
       }
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="flex pt-8 max-w-4xl">
            <div className="flex-1 pt-20 px-4">
                <div className="font-semibold text-3xl pb-4">
                    Join millions worldwide who automate their work using Chainly
                </div>

                <div className="pt-4 pb-4">
                    <CheckFeature text={"Easy setup no coding required"} />
                </div>
                <div className="pb-4">
                    <CheckFeature text={"Free forever for core features"} />
                </div>
                <CheckFeature text={"14-days trial on premium features and apps"} />
            </div>

            <div className="flex-1 pt-6 pb-6 mt-12 px-4 border border-slate-400 rounded">
                 <Input label={"Email"} onChange={(e : any) => {
                    setEmail(e.target.value)
                }} type="text" placeholder="Your email"></Input>

                 <Input label={"Password"} onChange={(e : any) => {
                    setPassword(e.target.value)
                }} type="password" placeholder="Your password"></Input>

                <div className="pt-4">
                    <PrimaryButton size="big" onClick={onSubmit} >Get started free</PrimaryButton>
                </div>
            </div>
        </div>
        </div>
    </div>
}