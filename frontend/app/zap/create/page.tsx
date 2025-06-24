"use client"
import { BACKEND_URL } from "@/app/config/config";
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function useAvailableActionsAndTrigger() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        async function main() {
            const res1 = await axios.get(`${BACKEND_URL}/api/v1/trigger/available`);
            const res2 = await axios.get(`${BACKEND_URL}/api/v1/action/available`);

            setAvailableTriggers(res1.data.availableTriggers);
            setAvailableActions(res2.data.availableActions);
        }

        main();
    }, []);

    return {
        availableActions,
        availableTriggers
    }
}

export default function CreateZap() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTrigger();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string,
        name: string
        image : string
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number,
        availableActionId: string,
        availableActionName: string
        image : string
    }[]>([]);

    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);

    async function handlePublish(){
        if(!selectedTrigger?.id) {
            alert("Please select trigger first");
            return;
        }

        if(selectedActions == null || selectedActions.length === 0){
            alert("Please select Action first");
            return;
        }

        const res = await axios.post(`${BACKEND_URL}/api/v1/zap/`, {
                availabletriggerId : selectedTrigger?.id,
                triggerMetadata : {},
                actions : selectedActions.map((action) => {
                    return {
                        availableactionId : action.availableActionId,
                        actionMetadata : {}
                    }
                })
        }, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        });

        alert("Zap has been published");
        router.push("/home");
    }

    return <div>
        <Appbar />
        <div className="flex justify-end bg-slate-200 p-4">
            <PrimaryButton onClick={handlePublish} > Publish </PrimaryButton>
        </div>

        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full" >
                <ZapCell onClick={() => {
                    setSelectedIndex(1);
                }} image={selectedTrigger?.image ? selectedTrigger.image : "https://cdn-icons-png.freepik.com/256/764/764492.png"} name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} index={1} />
            </div>
            <div className="flex flex-col items-center justify-center w-full pt-2 pb-2">
                {
                    selectedActions.map((action, index) => {
                        return <ZapCell onClick={() => {
                            setSelectedIndex(action.index);
                        }} image={action.image} name={action.availableActionName ? action.availableActionName : "Action"} index={action.index} />
                    })

                }
            </div>

            <div className="flex justify-center">
                <div className="w-4">
                    <PrimaryButton onClick={() => {
                        setSelectedActions((a) => {
                            return [...a, {
                                index: a.length + 2,
                                availableActionId: "",
                                availableActionName: "",
                                image : "https://cdn-icons-png.flaticon.com/512/5412/5412783.png"
                            }]
                        })
                    }} >
                        <div className="text-2xl font-bold flex justify-center items-center">
                            +
                        </div>
                    </PrimaryButton>
                </div>
            </div>
        </div>

        {selectedIndex && <Modal availableItems={selectedIndex === 1 ? availableTriggers : availableActions} index={selectedIndex} onSelect={
            (props: null | { name: string, id: string, image : string }) => {
                if (props === null) {
                    setSelectedIndex(null)
                    return;
                }

                if (selectedIndex == 1) {
                    // if trigger has been selected
                    setSelectedTrigger({ id: props.id, name: props.name, image : props.image });
                } else {
                    // action has been selected
                    setSelectedActions((a) => {
                        let newActions = [...a];
                        newActions[selectedIndex - 2] = {
                            index: selectedIndex,
                            availableActionId: props.id,
                            availableActionName: props.name,
                            image : props.image
                        }
                        return newActions;
                    })
                }
                setSelectedIndex(null)
            }
        } />}
    </div>
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string, id: string, image : string }) => void, availableItems: { id: string, name: string, image: string }[] }) {

    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();

    const isTrigger = index === 1;

    return <div className="overflow-y-auto overflow-x-hidden bg-opacity-70 flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full  ">
            <div className="relative bg-white rounded-lg shadow-sm ">

                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">
                        {
                            index === 1 ? "Select Trigger" : "Select Action"
                        }
                    </h3>
                    <button type="button" onClick={() => {
                        onSelect(null)
                    }} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-10 md:p-5 space-y-4">
                    {
                        availableItems.map((item) => {
                            return <div onClick={() => {
                                onSelect({
                                    id: item.id,
                                    name: item.name,
                                    image : item.image
                                })
                            }} className="flex border border-slate-300 rounded-sm p-4 cursor-pointer hover:bg-slate-200">
                                <img className="rounded-full" src={item.image} width={30}></img>
                                <div className="flex flex-col justify-center">
                                    {capitalizeFirstLetter(item.name)}
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}


function capitalizeFirstLetter(str : string) {
  if (str.length === 0) {
    return ""; 
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}