import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// This is a workaround for the "Internal Server Error" issue
// by ensuring the handler is properly exported
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
