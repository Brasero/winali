"use client";

import {Card, CardHeader, CardFooter,CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function LogIn(){

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
            <Label htmlFor={"password"} className={"mb-2"}>Mot de passe</Label>
            <Input
              type={'password'}
              id={'password'}
              placeholder={"Mot de passe"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <Button type={"submit"} className={"w-full"}>Se connecter</Button>
          </CardContent>
          <CardFooter className={"justify-center"}>
            <p>Pas encore de compte ? <Link className={"text-primary text-underline"} href={"/authentification/signin"}> Créer un compte</Link> </p>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}