import {auth} from "@/auth";
import {authRoute, privateRoute} from "@/routes";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const { nextUrl } = req;

    const isPrivateRoute = privateRoute.includes(nextUrl.pathname);
    const isAuthRoute = authRoute.includes(nextUrl.pathname);
    // Verifie si la route est une route d'achat de ticket (indisponible non connécté)
    const isCampaignRoute = nextUrl.pathname.startsWith("/campaigns") && nextUrl.pathname !== "/campaigns";

    if (isPrivateRoute && !isLoggedIn) {
        const loginUrl = new URL("/authentification/login", nextUrl.origin);
        return Response.redirect(loginUrl);
    }

    if (isCampaignRoute && !isLoggedIn) {
        const loginUrl = new URL("/authentification/login", nextUrl.origin);
        return Response.redirect(loginUrl);
    }

    if (isAuthRoute && isLoggedIn) {
        const profilUrl = new URL("/user/profil", nextUrl.origin);
        return Response.redirect(profilUrl);
    }

    return
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/campaigns/:path*"],
}