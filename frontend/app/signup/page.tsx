"use client"

import { Appbar } from "@/components/Appbar"
import { PrimaryButton } from "@/components/buttons/PrimaryButton"
import CheckFeature from "@/components/CheckFeature"
import { Input } from "@/components/Input"
import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config/config"
import { useRouter } from "next/navigation"

export default function Signup(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(){
       try{
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                "name": name,
                "username": email,
                "password": password
            });

            console.log(res);
            if(res.status == 200){
                router.push("/login");
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
        
        {/* Background decorative elements */}
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
                            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                🚀 Join millions of users
                            </div>
                            <h1 className="font-bold text-4xl lg:text-5xl leading-tight text-slate-800">
                                Join millions worldwide who 
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> automate their work</span> using Chainly
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Transform your workflow with powerful automation tools designed for teams of all sizes.
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

                        <div className="pt-12 space-y-4">
                            <div className="text-sm text-slate-500 font-medium">TRUSTED BY TEAMS AT</div>
                            <div className="flex items-center space-x-8 opacity-60">
                                <div className="w-20 h-8 bg-slate-300 rounded animate-pulse"></div>
                                <div className="w-16 h-8 bg-slate-300 rounded animate-pulse"></div>
                                <div className="w-24 h-8 bg-slate-300 rounded animate-pulse"></div>
                                <div className="w-18 h-8 bg-slate-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="flex-1 max-w-md">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 mt-12">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create your account</h2>
                            <p className="text-slate-600">Get started with your free account today</p>
                        </div>

                        <div className="space-y-6">
                            <div className="group">
                                <Input 
                                    label={"Name"} 
                                    onChange={(e : any) => {
                                        setName(e.target.value);
                                    }} 
                                    type="text" 
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="group">
                                <Input 
                                    label={"Email"} 
                                    onChange={(e : any) => {
                                        setEmail(e.target.value);
                                    }} 
                                    type="text" 
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="group">
                                <Input 
                                    label={"Password"} 
                                    onChange={(e : any) => {
                                        setPassword(e.target.value);
                                    }} 
                                    type="password" 
                                    placeholder="Your password"
                                />
                            </div>

                            <div className="pt-4">
                                <PrimaryButton 
                                    size="big" 
                                    onClick={onSubmit}
                                >
                                    Get started free
                                </PrimaryButton>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                            <p className="text-sm text-slate-600">
                                Already have an account? 
                                <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer ml-1">
                                    Sign in
                                </span>
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-slate-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            <span>Your data is secure and encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}