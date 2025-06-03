import {Card, CardHeader, CardFooter,CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function SignIn(){

  return(
    <>
      <form method={"POST"} action={"/"} >
        <Card className={"lg:w-[448px] sm:w-full"}>
          <CardHeader>
            <h1 className={'font-medium text-center'}>Créer un compte</h1>
          </CardHeader>
          <CardContent>
            <Label htmlFor={"email"} className={"mb-2"}>Email</Label>
            <Input
              type={'email'}
              id={'email'}
              placeholder={"votre@email.com"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Label htmlFor={"last_name"} className={"mb-2"}>Nom</Label>
            <Input
              type={'text'}
              id={'last_name'}
              placeholder={"votre@email.com"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Label htmlFor={"first_name"} className={"mb-2"}>Prénom</Label>
            <Input
              type={'text'}
              id={'first_name'}
              placeholder={"Prénom"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Label htmlFor={"birthday"} className={"mb-2"}>Date de naissance </Label>
            <Input
              type={'date'}
              id={'birthday'}
              placeholder={"JJ/MM/AAAA"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Label htmlFor={"password"} className={"mb-2"}>Mot de passe</Label>
            <Input
              type={'password'}
              id={'password'}
              placeholder={"Mot de passe"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Label htmlFor={"password_confirm"} className={"mb-2"}>Confirmer le mot de passe</Label>
            <Input
              type={'password'}
              id={'password_confirm'}
              placeholder={"Confirmer le mot de passe"}
              className={"flex-1 h-12 bg-background"}
              required
            />
            <Button type={"submit"} className={"w-full"}>Se connecter</Button>
          </CardContent>
          <CardFooter>
            <p>Déjà un compte ? <Link className={"text-primary text-underline"} href={"authentification/login"}> Se connecter</Link> </p>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}