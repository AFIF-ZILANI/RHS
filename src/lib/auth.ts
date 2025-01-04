import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    // access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    // useSecureCookies: process.env.NODE_ENV === "production",
    // callbacks: {
    //     async signIn({ user, account, profile }) {
    //         // Custom sign-in logic
    //         return true;
    //     },
    //     async redirect({ url, baseUrl }) {
    //         return url.startsWith(baseUrl) ? url : baseUrl;
    //     },
    // },
    debug: true, // Enable debugging to help troubleshoot issues
});
