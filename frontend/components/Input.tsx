"use client"

export const Input  = ({label, placeholder, onChange, type="text"} : {
    label : string;
    placeholder : string;
    onChange : any;
    type? : "text" | "password"
}) => {
    return <div>
        <div className="text-sm pb-1 pt-2">
            <label> {label} </label>
        </div>
        <input className="border rounded w-full border-black px-4 py-2" type={type}  placeholder={placeholder} onChange={onChange} />
    </div>
}