
export default function Feature({title, subtitle} : {
    title : string,
    subtitle : string 
}) {
    return <div className="flex pl-8">
        <Check /> 
        <div className="flex flex-col justify-center">
            <div className="flex">
                 <div className="font-bold">
                    {title}
                </div>
                <div className="pl-1 text-sm">
                    {subtitle}
                </div>
            </div>
        </div>
    </div>
}

function Check() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
}