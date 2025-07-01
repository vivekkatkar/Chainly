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
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string,
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": "string",
            "image": "string",
            "name": "string"
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([])

    useEffect(() => {
        async function main() {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/zap/`, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
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
    const url = `${HOOKS_URL}/hooks/catch/1/${zapId}`;
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
            {copied ? (
                <>
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                </>
            ) : (
                <>
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                </>
            )}
        </button>
    );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
    const router = useRouter()

    if (zaps.length === 0) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-12 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No automation chains yet</h3>
                    <p className="text-gray-500 text-sm">Create your first chain to start automating your workflows.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="col-span-5">Workflow</div>
                    <div className="col-span-2">Hook URL</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-1">Actions</div>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {zaps.map((zap, index) => (
                    <div key={zap.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            
                            <div className="col-span-5">
                                <div className="flex items-center space-x-3">
                                    
                                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                                        <img
                                            className="w-5 h-5 rounded"
                                            src={zap.trigger.type.image}
                                            alt={zap.trigger.type.name}
                                            onError={(e) => {
                                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E";
                                            }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {capitalizeFirstLetter(zap.trigger.type.name)}
                                        </span>
                                    </div>

                                    {zap.actions.length > 0 && (
                                        <div className="text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        {zap.actions.slice(0, 2).map((action, actionIndex) => (
                                            <div key={action.id} className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-2">
                                                <img
                                                    className="w-5 h-5 rounded"
                                                    src={action.type.image}
                                                    alt={action.type.name}
                                                    onError={(e) => {
                                                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3Cpolyline points='3.27,6.96 12,12.01 20.73,6.96'%3E%3C/polyline%3E%3Cline x1='12' y1='22.08' x2='12' y2='12'%3E%3C/line%3E%3C/svg%3E";
                                                    }}
                                                />
                                                <span className="text-sm font-medium text-blue-700">
                                                    {capitalizeFirstLetter(action.type.name)}
                                                </span>
                                            </div>
                                        ))}
                                        {zap.actions.length > 2 && (
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                +{zap.actions.length - 2} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <CopyHookUrl zapId={zap.id} />
                            </div>

                            <div className="col-span-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                                    Active
                                </span>
                            </div>

                            <div className="col-span-2">
                                <span className="text-sm text-gray-500">Nov 13, 2023</span>
                            </div>

                            <div className="col-span-1">
                                <button
                                    onClick={() => router.push("/zap/" + zap.id)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function capitalizeFirstLetter(str: string) {
    if (str.length === 0) {
        return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Dashboard() {
    const { loading, zaps } = useZaps();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-2 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Chainly</h1>
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total Chains</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {loading ? "..." : zaps.length}
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/zap/create")}
                                className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Create Chain
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Automation Chains</h2>
                    <p className="text-gray-600">Manage and monitor your automated workflows</p>
                </div>

                {loading ? (
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-center items-center py-16">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                                <span className="text-gray-600 font-medium">Loading chains...</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ZapTable zaps={zaps} />
                )}
            </div>
        </div>
    );
}