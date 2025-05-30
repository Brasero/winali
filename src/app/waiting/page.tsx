import {Button, buttonVariants} from "@/components/ui/button";


export default function Waiting(){

    return(
        <>
           <div className={"block items-stretch size-full"}>
            <div className={"block"}>
                <span className={`m-5 ${buttonVariants({size: "lg", variant:"primary_outline", radius: "full" })}`}>
                    Bientôt disponible
                </span>
            </div>
            <div className={"flex"}>
                <div className={"container w-[665px] h-full h-90 bg-red-50 box-content"}>
                    <h1 className={"font-bold text-6xl tracking-tight"}>Révolutionnez vos <span className={"bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral"}>ventes</span></h1>
                </div>
                <div className={"container w-90 h-full h-90 bg-red-50"}></div>
            </div>
           </div>
        </>

)
}