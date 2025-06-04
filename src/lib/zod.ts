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