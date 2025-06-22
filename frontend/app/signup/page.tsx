"use client"

import { Appbar } from "@/components/Appbar"
import { PrimaryButton } from "@/components/buttons/PrimaryButton"
import CheckFeature from "@/components/CheckFeature"
import { Input } from "@/components/Input"

export default function Signup(){
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
                <Input label={"Name"} onChange={(e : any) => {
                    console.log(e)
                }} type="text" placeholder="Your name"></Input>

                 <Input label={"Email"} onChange={(e : any) => {
                    console.log(e)
                }} type="text" placeholder="Your email"></Input>

                 <Input label={"Password"} onChange={(e : any) => {
                    console.log(e)
                }} type="password" placeholder="Your password"></Input>

                <div className="pt-4">
                    <PrimaryButton size="big" onClick={() => {

                    }} >Get started free</PrimaryButton>
                </div>
            </div>
        </div>
        </div>
    </div>
}