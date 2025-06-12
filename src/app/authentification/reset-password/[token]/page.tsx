import { z } from 'zod';
import { redirect } from 'next/navigation';
import { resetPasswordWithToken } from '@/lib/actions/reset-password';
import {ArrowLeft, Lock} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";


const schema = z.object({
  password: z.string()
  .min(8, 'Au moins 8 caractères')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{8,}$/,
    "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"
  ),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword']
});

export default async function ResetPasswordPage({ params, searchParams }: {
  params: Promise<{ token: string }>,
  searchParams: Promise<{ error?: string, success?: string }>
}) {
  const error = (await searchParams).error;
  const success = (await searchParams).success;
  const token = (await params).token;
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">Nouveau mot de passe</CardTitle>
            <CardDescription>Choisissez un mot de passe sécurisé</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success ? (
              <Alert>
                <AlertDescription>
                  Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.
                  <Link href={"/authentification/login"} className={"w-full mt-5"}>
                    <Button className={"w-full"}>
                      <ArrowLeft className={"text-white"} />
                      Se connecter
                    </Button>
                  </Link>
                </AlertDescription>
              </Alert>
            ) : (
              <form method={"GET"} action={async (formData: FormData) => {
                'use server';
                const password = formData.get('password')?.toString() || '';
                const confirmPassword = formData.get('confirmPassword')?.toString() || '';
                
                const parse = schema.safeParse({ password, confirmPassword });
                
                if (!parse.success) {
                  const firstError = parse.error.errors[0];
                  redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password/${token}?error=${encodeURIComponent(firstError.message)}`, "replace");
                  return
                }
                let result: {success: boolean, error?: string};
                try {
                  result = await resetPasswordWithToken(token, password);
                } catch (e) {
                  console.error(e)
                  redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password/${token}?error=${encodeURIComponent("Erreur inattendue")}`);
                  return
                }
                if (result.success) {
                  redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password/${token}?success=1`);
                } else {
                  redirect(`${process.env.NEXT_PUBLIC_APP_URL}/authentification/reset-password/${token}?error=${encodeURIComponent(result.error)}`);
                }
              }} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Nouveau mot de passe
                  </label>
                  <Input type="password" name="password" id="password" required />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirmer le mot de passe
                  </label>
                  <Input type="password" name="confirmPassword" id="confirmPassword" required />
                </div>
                
                <Button type="submit" className="w-full">
                  Mettre à jour le mot de passe
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}