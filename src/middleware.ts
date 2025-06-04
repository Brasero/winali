import {auth} from "@/auth";

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|authentification).*)"]
}
export default auth((req) => {
    if (!req.auth && !req.nextUrl.pathname.endsWith("/login")) {
        const newUrl = new URL("/authentification/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
})