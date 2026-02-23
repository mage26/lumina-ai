import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
type Props = {
    children: ReactNode;
    className?: string;
};
export default function Title({ children, className='' }: Props) {
    return (
        <h2 className={twMerge("text-xl font-bold text-primary", className)}>
            {children}
        </h2>
    )
}