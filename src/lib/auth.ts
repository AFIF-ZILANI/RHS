import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./db";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    // access_type: "offline",
                    // response_type: "code",
                },
            },
        }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    useSecureCookies: process.env.NODE_ENV === "production",
    callbacks: {
        // async signIn(user, account, profile) {
            
        //     return true;
        // }
        // async session(session, user) {
        // return session;
        // },
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : `${baseUrl}/onboarding`;
        },
    },
    debug: true, // Enable debugging to help troubleshoot issues
});
