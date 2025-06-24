"use client"
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import Feature from "./Feature";

export default function Hero(){
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 px-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main headline */}
                <div className="flex justify-center">
                    <div className="text-6xl md:text-7xl font-bold text-center pt-16 max-w-4xl leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Automate as fast as you can type
                        </span>
                    </div>
                </div>

                {/* Subtitle */}
                <div className="flex justify-center">
                    <div className="text-xl md:text-2xl font-normal text-gray-600 text-center pt-8 max-w-3xl leading-relaxed">
                        Automate your daily tasks effortlessly. Connect apps, streamline workflows, and boost productivity — no code, just smart automation.
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center pt-12 gap-4">
                    <PrimaryButton onClick={() => {
                        router.push("/signup")
                    }} size="big">
                        Get Started for free
                    </PrimaryButton>
                    <SecondaryButton onClick={() => {}} size="big" >
                        Contact Sales
                    </SecondaryButton>
                </div>

                {/* Features */}
                <div className="flex flex-col md:flex-row justify-center items-center pt-16 gap-8 md:gap-12">
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <Feature title="Free forever" subtitle="for core features" />
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <Feature title="More apps" subtitle="than other platforms" />
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                        <Feature title="Easy Integration" subtitle="for all apps" />
                    </div>
                </div>
            </div>
        </div>
    );
}