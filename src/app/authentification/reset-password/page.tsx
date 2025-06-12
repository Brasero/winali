import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';


type Props = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const success = (await searchParams).success === 'true';
  const error = (await searchParams).error;
  
  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Mail className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Mot de passe oublié ?
            </CardTitle>
            <CardDescription className="text-gray-600">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {success && (
              <Alert className={"text-green-500 flex"}>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <AlertDescription className={"text-green-600"}>
                  Un lien de réinitialisation a été envoyé à votre adresse email.
                </AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form method="POST" action="/api/auth/forgot">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Adresse email
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full mt-6">
                Envoyer le lien
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-3">
              <p className="text-sm text-gray-500">
                Vous vous souvenez de votre mot de passe ?
              </p>
              <Link href="/" passHref>
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à la connexion
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}