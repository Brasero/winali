import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import Link from "next/link";
import {buttonVariants} from "@/components/ui/button";

const Thank = () => {
    return (
        <div className="min-h-screen pt-20 pb-16 hero-gradient flex flex-col items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl leading-20 sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">PartyChance</h1>
                    <Card className={"w-1/2"}>
                        <CardHeader className={"flex flex-row items-center justify-center w-full"}>
                            <h2 className={"text-2xl mb-4 text-green-600"}>E-mail validé</h2>
                        </CardHeader>
                        <CardContent>
                            <p className={"text-gray-600 px-5 text-center"}>Votre adresse mail à été validé, vous recevrez un e-mail lors du lancement de la plateforme.</p>
                        </CardContent>
                        <CardFooter>
                            <Link href={"/"} className={buttonVariants({variant: "link"})}>Retour</Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Thank