export function ZodErrors({error}: {error: string[] | string}) {
    if (!error || error.length === 0) return null;
    if (typeof error !== "string") return error.map((err: string, index: number) => {
        return (
            <div key={index} className={"text-pink-500 text-xs italic mt-0 mb-1 py-2"}>
                {err}
            </div>
        )
    });
    return (
        <div className={"text-pink-500 text-xs italic mt-0 mb-1 py-2"}>
            {error}
        </div>
    );
}