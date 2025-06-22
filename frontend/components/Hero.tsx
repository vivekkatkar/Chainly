"use client"
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import Feature from "./Feature";

export default function Hero(){
    const router = useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
                Automate as fast as you can type 
            </div>
        </div>

         <div className="flex justify-center">
            <div className="text-xl font-normal text-center pt-8 max-w-2xl">
                Automate your daily tasks effortlessly. Connect apps, streamline workflows, and boost productivity — no code, just smart automation.
            </div>
        </div>

        <div className="flex justify-center pt-10">
            <PrimaryButton onClick={ () => {
                router.push("/signup")
            } } size="big" > Get Started for free</PrimaryButton>
            <div className="pl-4"></div>
            <SecondaryButton onClick={ () => {} } size="big" > Contact Sales </SecondaryButton>
        </div>

        <div className="flex justify-center pt-4">
            <Feature title="Free forever" subtitle="for core features" />
            <Feature title="More apps" subtitle="than other platforms" />
            <Feature title="Easy Integration" subtitle="for all apps" />
        </div>
    </div>
}