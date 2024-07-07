import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        id: string
        name: string
        email: string
        cognitoGroups: string[]
        accessToken: string
        refreshToken: string
        idToken: string
        exp: number
        roles: string[]
    }

    interface Session {
        user: User & DefaultSession["user"]
        expires: string
        error: string
        accessToken: string | unknown
    }
}