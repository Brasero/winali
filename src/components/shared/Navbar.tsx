
import {Button, buttonVariants} from '@/components/ui/button';
import Link from "next/link";
import {auth, signOut} from "@/auth";
import {Menu, LogOut} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuPortal,
    DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className="border-b py-4 bg-white sticky top-0 w-full z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">
                            Winali
                          </span>
                        </Link>
                    </div>
                    {/*Links*/}
                    <div className="hidden mx-4 md:flex gap-6 items-center">
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

                    <div className="flex items-center gap-4">
                        {session?.user ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className={`${buttonVariants({variant: "outline"})} focus-visible:ring-transparent flex gap-1 flex-row-reverse align-center`}><span className={"hidden md:flex"}>Menu</span> <Menu /> </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>{"é".toUpperCase()}space client</DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <Link href={"/user/profil"}><DropdownMenuItem>Profil</DropdownMenuItem></Link>
                                        <Link href={"/user/participations"}><DropdownMenuItem>Mes participations</DropdownMenuItem></Link>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Ventes</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <Link href={"/user/profil#seller_section"}><DropdownMenuItem>Mes ventes</DropdownMenuItem></Link>
                                                    <Link href={"/user/campaign"}><DropdownMenuItem>Créer une vente</DropdownMenuItem></Link>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuContent>
                                </DropdownMenu>

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