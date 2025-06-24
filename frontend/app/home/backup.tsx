"use client"
import { Appbar } from "@/components/Appbar";
import { DarkButton } from "@/components/buttons/DarkButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config/config";
import { headers } from "next/headers";
import { LinkButton } from "@/components/buttons/LinkButton";
import { useRouter } from "next/navigation";

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

// hook
function useZaps(){
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([])

    useEffect(()=> {
        async function main(){
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap/`, {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            });
            setZaps(res.data.zaps);
            setLoading(false)
        }

        main();
    }, []);

    return {
        loading, zaps
    }
}

export default function() {
    const {loading, zaps} = useZaps();
    const router = useRouter();

    return <div className="">
        <Appbar />
       <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
            <div className="flex justify-between pr-8">
                    <div className="text-2xl font-bold">
                        My Chains 
                    </div>
                    <DarkButton onClick={() => {
                        router.push("/zap/create")
                    }}> Create + </DarkButton>
            </div>
        </div>
       </div>

       {loading ? "Loading" : 
       <div className="flex justify-center">
        <ZapTable zaps={zaps} />
        </div>
       } 
    </div>
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
        className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
  );
}


function ZapTable({zaps} : {zaps : Zap[]}) {
    console.log(zaps);
    const router = useRouter()
    return <div className="max-w-screen-lg w-full p-8">   
        <div className="flex">
                <div className="flex w-100 ">Name</div>
                <div className="flex-1 ">Created At</div>
                <div className="flex-1 ">Hooks URL </div>
                <div className="flex-1 ">Go</div>
        </div>
        <div>
            {
                zaps.map((zap) => {
                    return <div className="flex border-b py-4 border-t border-gray-200">
                        <div className="flex w-100 space-x-4">
                            <div className="flex">
                            <img className="w-6 h-6" src={zap.trigger.type.image}></img>
                            {capitalizeFirstLetter(zap.trigger.type.name)} 
                            </div> 
                            {
                                zap.actions.map((action) => {
                                    return <div className="flex justify-center">
                                        <img className="w-6 h-6" src={action.type.image} ></img>
                                        <div className="">{" " + capitalizeFirstLetter(action.type.name)} </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className="flex-1"> <CopyHookUrl zapId={zap.id} /> </div>
                        <div className="flex-1"> Nov 13, 2023</div>
                        <div className="flex-1"> <LinkButton onClick={() => {
                            router.push("/zap/" + zap.id) 
                        }} >Go</LinkButton></div>
                    </div>
                })
            }
        </div>
    </div>
}


function capitalizeFirstLetter(str : string) {
  if (str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}