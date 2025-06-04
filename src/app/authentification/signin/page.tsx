"use client";
import {useState} from "react";
import {Card, CardHeader, CardFooter,CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {signInSchema} from "@/lib/zod";
import {ZodErrors} from "@/components/utils/ZodErrors";
import {toast} from "sonner";

type FieldName = "email" | "first_name" | "last_name" | "birth_date" | "password" | "password_confirm";

const initialUserState = {
  email: "",
  first_name: "",
  last_name: "",
  birth_date: "",
  password: "",
  password_confirm: ""
}
export default function SignIn(){
  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState( {});
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value} = e.target;
    const name: FieldName = e.target.name as FieldName;
    setUser(prev => ({...prev, [name]: value}));

    // Validate the input on change
    const result = signInSchema.safeParse({...user, [name]: value});
    // If validation fails, set the error for the specific field
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        ...errors,
        [name]: formatted[name] || ""
      });
    } else {
      setErrors({});
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = signInSchema.safeParse(user);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    const toastId = toast.loading("Inscription en cours ...")
    setErrors({});
    // If validation passes, you can proceed with form submission
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Erreur lors de l'inscription", {
            description: "Veuillez vérifier vos informations et réessayer.",
            duration: 5000,
            id: toastId
        });
        return;
      }
      const responseData = await response.json();
      // Handle successful signup (e.g., redirect or show success message)
      toast.success(responseData.message, {
        description: "Un e-mail de validation vous a été envoyé.",
        duration: 10000,
        id: toastId
      });
      setUser(initialUserState); // Reset the form
    } catch (error: Error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error(error.message || "Erreur lors de l'inscription, veuillez réessayer plus tard.");
    }
    finally {
      setIsLoading(false)
    }
  }


  return(
    <>
      <form onSubmit={handleSubmit} className={"max-w-[448px] w-[100%]"}>
        <Card>
          <CardHeader>
            <h1 className={'font-medium text-center'}>Créer un compte</h1>
          </CardHeader>
          <CardContent>
            <Label htmlFor={"email"} className={"mb-2"}>Email</Label>
            <Input
              type={'email'}
              id={'email'}
              name={"email"}
              value={user.email}
              onChange={handleChange}
              placeholder={"votre@email.com"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.email?._errors} />
            <Label htmlFor={"last_name"} className={"mb-2"}>Nom</Label>
            <Input
              type={'text'}
              id={'last_name'}
              name={"last_name"}
              value={user.last_name}
              onChange={handleChange}
              placeholder={"Nom"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.last_name?._errors} />
            <Label htmlFor={"first_name"} className={"mb-2"}>Prénom</Label>
            <Input
              type={'text'}
              id={'first_name'}
              name={"first_name"}
              value={user.first_name}
              onChange={handleChange}
              placeholder={"Prénom"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.first_name?._errors} />
            <Label htmlFor={"birthday"} className={"mb-2"}>Date de naissance </Label>
            <Input
              type={'date'}
              id={'birthday'}
              name={"birth_date"}
              value={user.birth_date}
              onChange={handleChange}
              placeholder={"JJ/MM/AAAA"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.birth_date?._errors} />
            <Label htmlFor={"password"} className={"mb-2"}>Mot de passe</Label>
            <Input
              type={'password'}
              id={'password'}
              name={"password"}
              placeholder={"Mot de passe"}
              value={user.password}
              onChange={handleChange}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.password?._errors} />
            <Label htmlFor={"password_confirm"} className={"mb-2"}>Confirmer le mot de passe</Label>
            <Input
              type={'password'}
              id={'password_confirm'}
              name={"password_confirm"}
              value={user.password_confirm}
              onChange={handleChange}
              placeholder={"Confirmer le mot de passe"}
              className={"flex-1 h-12 bg-background mb-5"}
              required
            />
            <ZodErrors error={errors?.password_confirm?._errors} />
            <Button type={"submit"} disabled={isLoading} className={"w-full"}>S&apos;inscrire</Button>
          </CardContent>
          <CardFooter className={"justify-center"}>
            <p>Déjà un compte ? <Link className={"text-primary text-underline"} href={"/authentification/login"}> Se connecter</Link> </p>
          </CardFooter>
        </Card>
      </form>
    </>
  )
}