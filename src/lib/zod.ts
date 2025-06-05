import zod from 'zod';

export const signInSchema = zod.object({
    "email": zod.string({required_error: "L'email est requis"})
        .min(1,  "L'email ne peut pas être vide")
        .email("L'email doit être valide"),
    "last_name": zod.string({required_error: "Le nom est requis"})
        .min(1, "Le nom ne peut pas être vide"),
    "first_name": zod.string({required_error: "Le prénom est requis"})
        .min(1, "Le prénom ne peut pas être vide"),
    "birth_date": zod.string({required_error: "La date de naissance est requise"})
        .min(1, "La date de naissance ne peut pas être vide")
        .regex(/^\d{4}-\d{2}-\d{2}$/, "La date de naissance doit être au format JJ-MM-AAAA"),
    "password": zod.string({required_error: "Le mot de passe est requis"})
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$.!%*?&])[A-Za-z\d@$.!%*?&]{8,}$/, "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial"),
    "password_confirm": zod.string({required_error: "La confirmation du mot de passe est requise"})
}).refine((data) => data.password === data.password_confirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirm"],
})

export const loginSchema = zod.object({
    email: zod.string({required_error: "L'email est requis"})
        .min(1, "L'email ne peut pas être vide")
        .email("L'email doit être valide"),
    password: zod.string({required_error: "Le mot de passe est requis"})
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
})

export const addCampaignSchema = zod.object({
    title:zod.string({required_error:"Le titre est requis"})
      .min(3,"Titre trop court")
      .max(50, "Titre trop long"),
    description:zod.string({required_error:"La description ne peut pas être vide"})
      .min(10, "Déscription trop courte ")
      .max(255, "Déscription trop longue"),
    image_urls:zod.instanceof(FileList),
    ticket_price:zod.coerce.number({required_error: "Le prix du ticket est nécessaire"})
      .min(0,"Le prix du ticket doit être supérieur a 0€"),
    min_tickets:zod.coerce.number({required_error:"Un nombre de ticket est requis"})
      .min(1,"Vous devez mettre en vente au moins 1 ticket"),
    end_date: zod.string({required_error: "La date de fin est requise"})
      .min(1, "La date de fin ne peut pas être vide")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "La date de fin doit être au format JJ-MM-AAA"),



}).refine((data) => data.image_urls.length > 0, {message:"Au moins une images est requise",path:["image_urls"]})
.refine((data) => data.image_urls.length < 5, {message: "Limite d'images atteinte", path:["image_urls"]})

