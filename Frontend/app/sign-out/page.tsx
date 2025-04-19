"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useClerk } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"

export default function SignOutPage() {
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    const performSignOut = async () => {
      await signOut()
      router.push("/")
    }

    performSignOut()
  }, [signOut, router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      <p className="mt-4 text-muted-foreground">Signing out...</p>
    </div>
  )
}
