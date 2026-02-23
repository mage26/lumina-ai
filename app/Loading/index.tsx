
export default function Loading() {
    return (
        <section className="bg-foreground p-16 min-h-screen text-center w-full relative mx-auto flex flex-col gap-6 items-center justify-center">
            <p className="text-xl font-bold animate-pulse">Analyzing...</p>
            <div className="loader" />
        </section>
    )
}