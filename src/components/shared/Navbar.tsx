
import {Button, buttonVariants} from '@/components/ui/button';
import Link from "next/link";
import {auth, signOut} from "@/auth";
import {LogOut} from "lucide-react";

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className="border-b py-4 bg-white fixed w-full z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/public" className="flex items-center space-x-2">
                          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">
                            PartiChance
                          </span>
                        </Link>
                    </div>
                    {/*Links*/}
                    <div className="hidden md:flex sm:gap-2 items-center gap-6">
                        <Link href="#comment-ca-marche" className="text-gray-600 hover:text-brand-purple transition-colors font-medium">
                            Comment ça marche
                        </Link>
                        <Link href="#ventes-actives" className="text-gray-600 hover:text-brand-purple transition-colors font-medium">
                            Ventes actives
                        </Link>
                        <Link href="#gagnants" className="text-gray-600 hover:text-brand-purple transition-colors font-medium">
                            Gagnants
                        </Link>
                    </div>

                    <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch">
                        {session?.user ? (
                            <>

                                <form action={async () => {
                                    "use server"
                                    await signOut()
                                }}>
                                    <Button className={`text-white`} type={"submit"} variant="destructive">
                                        <LogOut className="w-4 h-4 mr-2"/>
                                        Se déconnecter
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href={"/authentification/login"}
                                      className={`${buttonVariants({variant: "outline"})} hidden sm:flex`}>
                                    Se connecter
                                </Link>
                                <Link href={"/authentification/signup"}
                                      className={`${buttonVariants({variant: "default"})}`}>
                                    S&apos;inscrire
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;