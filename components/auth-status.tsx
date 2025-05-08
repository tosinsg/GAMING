"use client"

import { useSession } from "next-auth/react"

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "authenticated") {
    return <div>Authenticated as {session.user?.name}</div>
  }

  return <div>Not authenticated</div>
}
