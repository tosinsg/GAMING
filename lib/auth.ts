import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

// Mock users for local development
const mockUsers = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password123", // Plain text for simplicity in local dev
    image: "/images/avatars/default.png",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123", // Plain text for simplicity in local dev
    image: "/images/avatars/default.png",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = mockUsers.find((user) => user.email === credentials.email)

        if (!user) {
          return null
        }

        // For local development, just do a simple password check
        const isPasswordValid = credentials.password === user.password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  // Make sure to use the NEXTAUTH_SECRET environment variable
  secret: process.env.NEXTAUTH_SECRET,
}
