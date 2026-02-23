import { twMerge } from "tailwind-merge";

type Props = {
    name?: string;
    value: string; 
    className?: string;
}

export default function CopyText({ name, value, className = '' }: Props) {
    return (
        <div className={twMerge("text-left mb-5", className)}>
            
            <div className="flex gap-4 justify-between items-center">
                <span className="font-bold text-accent">{name}</span>
                <button 
                    type="button"
                    className="py-1 px-2 bg-background rounded-lg block cursor-pointer hover:text-accentcontrast hover:bg-accent"
                    onClick={() => { navigator.clipboard.writeText(value)}}
                >
                    COPY
                </button>
            </div>
            <p className="text-sm mt-2">{value}</p>
        </div>
    )
}