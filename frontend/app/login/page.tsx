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

    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Appbar />
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex justify-center px-4 py-8">
            <div className="flex max-w-6xl w-full gap-12 items-start">
            
                <div className="flex-1 pt-20 px-6">
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                ✨ Welcome back
                            </div>
                            <h1 className="font-bold text-4xl lg:text-5xl leading-tight text-slate-800">
                                Continue your 
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> automation journey</span> with Chainly
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Sign in to access your workflows, automations, and productivity tools.
                            </p>
                        </div>

                        <div className="space-y-6 pt-8">
                            <div className="transform hover:translate-x-2 transition-all duration-300">
                                <CheckFeature text={"Easy setup no coding required"} />
                            </div>
                            <div className="transform hover:translate-x-2 transition-all duration-300">
                                <CheckFeature text={"Free forever for core features"} />
                            </div>
                            <div className="transform hover:translate-x-2 transition-all duration-300">
                                <CheckFeature text={"14-days trial on premium features and apps"} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 mt-12">
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome back</h2>
                            <p className="text-slate-600">Sign in to your account to continue</p>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <Input 
                                    label={"Email"} 
                                    onChange={(e : any) => {
                                        setEmail(e.target.value)
                                    }} 
                                    type="text" 
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="group">
                                <Input 
                                    label={"Password"} 
                                    onChange={(e : any) => {
                                        setPassword(e.target.value)
                                    }} 
                                    type="password" 
                                    placeholder="Your password"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-slate-600">Remember me</span>
                                </label>
                                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                                    Forgot password?
                                </span>
                            </div>

                            <div className="pt-2">
                                <PrimaryButton 
                                    size="big" 
                                    onClick={onSubmit}
                                >
                                    Sign in to your account
                                </PrimaryButton>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                            <p className="text-sm text-slate-600">
                                Don't have an account? 
                                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer ml-1">
                                    Sign up for free
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}