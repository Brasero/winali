"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Card, CardHeader, CardFooter,CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import {loginSchema} from "@/lib/zod";
import {ZodErrors} from "@/components/utils/ZodErrors";

type FieldName = "email" | "password";
type ErrorFields = {
  [key in FieldName]?: {
    _errors: string[] | string;
  };
}
export default function LogIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({} as ErrorFields);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const name: FieldName = e.target.name as FieldName;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }

    // Validate the input on change
    const result = loginSchema.safeParse({ email, password });
    // If validation fails, set the error for the specific field
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        ...errors,
        [name]: formatted[name] || ""
      });
    } else {
      setErrors({} as ErrorFields);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Connexion en cours ...");
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
    })

    if (result?.error) {
        toast.error(result.code?.replaceAll("_", " "), { id: toastId });
        setIsLoading(false);
        setErrors({
            email: { _errors: ["Identifiants incorrects"] }
        });
        return
    }
    if (result?.ok) {
        toast.success("Connexion réussie", { id: toastId });
        setIsLoading(false);
        router.push("/user/profil");
        return;
    }
  }

  return(
    <>
      <form onSubmit={handleSubmit} >
        <Card className={"lg:w-[448px] sm:w-full"}>
          <CardHeader>
            <h1 className={'font-medium text-center'}>Se connecter</h1>
          </CardHeader>
          <CardContent>
            <Label htmlFor={"email"} className={"mb-2"}>Email</Label>
            <Input
              type={'email'}
              id={'email'}
              name={"email"}
              value={email}
              onChange={handleChange}
              placeholder={"votre@email.com"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.email?._errors} />
            <Label htmlFor={"password"} className={"mb-2"}>Mot de passe</Label>
            <Input
              type={'password'}
              id={'password'}
              name={"password"}
              value={password}
              onChange={handleChange}
              placeholder={"Mot de passe"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.password?._errors} />
            <Button type={"submit"} disabled={isLoading} className={"w-full"}>Se connecter</Button>
          </CardContent>
          <CardFooter className={"justify-center"}>
            <p>Pas encore de compte ? <Link className={"text-primary text-underline"} href={"/authentification/signup"}> Créer un compte</Link> </p>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}