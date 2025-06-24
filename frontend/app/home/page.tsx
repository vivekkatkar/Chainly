"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Appbar } from "@/components/Appbar";
import axios from "axios";
import { DarkButton } from "@/components/buttons/DarkButton";
import { BACKEND_URL, HOOKS_URL } from "../config/config";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";


interface Zap {
    "id" : string,
    "triggerId" : string,
    "userId" : number,
    "actions" : {
        "id" : string,
        "zapId" : string,
        "actionId" : string,
        "sortingOrder" : number,
        "type" : {
            "id" : string,
            "name" : string 
            "image" : string,
        }
    }[],
    "trigger" : {
        "id" : string,
        "zapId" : string,
        "triggerId" : string,
        "type" : {
            "id" : "string",
            "image" : "string",
            "name" : "string"
        }
    }
}

function useZaps(){
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([])

    useEffect(()=> {
        async function main(){
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/zap/`, {
                    headers : {
                        "Authorization" : localStorage.getItem("token")
                    }
                });
                setZaps(res.data.zaps);
            } catch (error) {
                console.error("Failed to fetch zaps:", error);
                setZaps([]); 
            }
            setLoading(false)
        }

        main();
    }, []);

    return {
        loading, zaps
    }
}

function CopyHookUrl({ zapId }: { zapId: string }) {
  const url = `${HOOKS_URL}/hooks/catch/${zapId}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); 
  };

  return (
      <button
        onClick={handleCopy}
        className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors duration-200 min-w-[80px]"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
  );
}

function ZapTable({zaps} : {zaps : Zap[]}) {
    console.log(zaps);
    const router = useRouter()
    
    if (zaps.length === 0) {
        return (
            <div className="max-w-7xl w-full mx-auto px-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No chains yet</h3>
                    <p className="text-gray-600">Create your first chain to get started with automation.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl w-full mx-auto px-6">   
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-6 text-sm font-semibold text-gray-700">Workflow</div>
                        <div className="col-span-2 text-sm font-semibold text-gray-700">Hook URL</div>
                        <div className="col-span-2 text-sm font-semibold text-gray-700">Created</div>
                        <div className="col-span-2 text-sm font-semibold text-gray-700">Actions</div>
                    </div>
                </div>
                
               
                <div className="divide-y divide-gray-200">
                    {
                        zaps.map((zap, index) => {
                            return (
                                <div key={zap.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Workflow Column - 6 columns */}
                                        <div className="col-span-6">
                                            <div className="flex items-center space-x-2 flex-wrap">
                                                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-3 py-1 mb-1">
                                                    <img 
                                                        className="w-5 h-5 rounded flex-shrink-0" 
                                                        src={zap.trigger.type.image}
                                                        alt={zap.trigger.type.name}
                                                        onError={(e) => {
                                                            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E";
                                                        }}
                                                    />
                                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                                        {capitalizeFirstLetter(zap.trigger.type.name)}
                                                    </span>
                                                </div>
                                                
                                                {zap.actions.length > 0 && (
                                                    <>
                                                        <div className="text-gray-400 flex-shrink-0">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex items-center space-x-1 flex-wrap">
                                                            {zap.actions.map((action, actionIndex) => (
                                                                <div key={action.id} className="flex items-center space-x-1">
                                                                    <div className="flex items-center space-x-1 bg-blue-50 rounded-lg px-3 py-1 mb-1">
                                                                        <img 
                                                                            className="w-5 h-5 rounded flex-shrink-0" 
                                                                            src={action.type.image}
                                                                            alt={action.type.name}
                                                                            onError={(e) => {
                                                                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E";
                                                                            }}
                                                                        />
                                                                        <span className="text-sm font-medium text-blue-700 whitespace-nowrap">
                                                                            {capitalizeFirstLetter(action.type.name)}
                                                                        </span>
                                                                    </div>
                                                                    {actionIndex < zap.actions.length - 1 && (
                                                                        <div className="text-gray-400 mx-1 flex-shrink-0">
                                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Hook URL Column - 2 columns */}
                                        <div className="col-span-2 flex items-center">
                                            <CopyHookUrl zapId={zap.id} />
                                        </div>
                                        
                                        {/* Created Column - 2 columns */}
                                        <div className="col-span-2 text-sm text-gray-600">
                                            Nov 13, 2023
                                        </div>
                                        
                                        {/* Actions Column - 2 columns */}
                                        <div className="col-span-2 flex items-center">
                                            <LinkButton onClick={() => {
                                                router.push("/zap/" + zap.id) 
                                            }}>
                                                Go →
                                            </LinkButton>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

function capitalizeFirstLetter(str : string) {
  if (str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function() {
    const {loading, zaps} = useZaps();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-r from-gray-200 to-gray-200 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-2">
                    <div className="flex justify-between items-center text-orange-600">
                        <div>
                            <h1 className="text-3xl font-sans font-bold  mb-2">Chainly </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right text-white/80 hidden sm:block">
                                <p className="text-sm text-black">Total Chains</p>
                                <p className="text-2xl font-bold text-blue-700">{loading ? "..." : zaps.length}</p>
                            </div>
                            <PrimaryButton onClick={() => {
                                router.push("/zap/create")
                            }}>
                               <div className="flex p-1 font-xl">  
                               Create Chain + </div>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-8">
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <div className="flex items-center space-x-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <span className="text-gray-600 font-medium">Loading your chains...</span>
                        </div>
                    </div>
                ) : (
                    <ZapTable zaps={zaps} />
                )}
            </div>
        </div>
    );
}