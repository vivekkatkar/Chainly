"use client"
import { useRouter } from "next/navigation"
import { LinkButton } from "./buttons/LinkButton"
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    return (
        <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Chainly
                        </div>
                    </div>

                    {/* Navigation Section */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                Features
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                Pricing
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                                Documentation
                            </a>
                        </nav>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3">
                            <LinkButton onClick={() => { }}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Contact Sales
                            </LinkButton>
                            
                            <LinkButton onClick={() => {
                                router.push("/login")
                            }}>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Login
                            </LinkButton>
                        </div>

                        <PrimaryButton onClick={() => {
                            router.push("/signup");
                        }}>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                            Get Started
                        </PrimaryButton>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Hidden by default */}
            <div className="md:hidden border-t border-gray-200 bg-gray-50">
                <div className="px-6 py-4 space-y-3">
                    <a href="#" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                        Features
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                        Pricing
                    </a>
                    <a href="#" className="block text-gray-600 hover:text-gray-900 font-medium py-2">
                        Documentation
                    </a>
                    <div className="pt-3 border-t border-gray-200 space-y-2">
                        <LinkButton onClick={() => { }}>
                            Contact Sales
                        </LinkButton>
                        <LinkButton onClick={() => {
                            router.push("/login")
                        }}>
                            Login
                        </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    );
}