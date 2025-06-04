import { Button } from '@/components/ui/button';
import Link from "next/link";

const Navbar = () => {
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

                    <div className="hidden md:flex items-center space-x-8">
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

                    <div className="flex items-center space-x-4">
                        <Button variant="outline" className="hidden sm:flex">
                            Se connecter
                        </Button>
                        <Button className="bg-brand-purple hover:bg-brand-purple/90">
                            S&apos;inscrire
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;