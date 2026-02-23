import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
    children: ReactNode;
    title: string;
    className?: string;
}

export default function Section({children, title, className = ''}: Props) {
    return (
        <section className={twMerge(
            "relative w-full bg-foreground rounded-2xl",
            className
        )}>
            <h2 className="text-xl font-bold bg-primary text-primarycontrast p-4 rounded-t-2xl">
                {title}
            </h2>
            <div className="p-4">
                {children}
            </div>
        </section>
    );
}