"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleGoogleAuth = () => {
    setLoading(true)

    // Simulate Google authentication
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0b021c] flex flex-col items-center justify-center p-4">
      {/* Logo and Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8243ea] to-[#9a5dff] bg-clip-text text-transparent">
          SKILLYST
        </h1>
        <p className="text-white/80 mt-2">Resume Builder</p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-[#1f2416] rounded-xl shadow-xl overflow-hidden border border-[#333333]">
        {/* Tabs */}
        <div className="flex border-b border-[#333333]">
          <button
            className={`flex-1 py-4 text-center transition-colors ${
              activeForm === "login" ? "bg-[#8243ea]/20 text-white" : "text-white/60 hover:text-white"
            }`}
            onClick={() => setActiveForm("login")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-4 text-center transition-colors ${
              activeForm === "signup" ? "bg-[#8243ea]/20 text-white" : "text-white/60 hover:text-white"
            }`}
            onClick={() => setActiveForm("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form Carousel */}
        <div className="relative overflow-hidden" style={{ minHeight: "400px" }}>
          <AnimatePresence mode="wait">
            {activeForm === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <LoginForm
                  onSubmit={handleSubmit}
                  onGoogleAuth={handleGoogleAuth}
                  loading={loading}
                  onSwitchForm={() => setActiveForm("signup")}
                />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="p-6"
              >
                <SignupForm
                  onSubmit={handleSubmit}
                  onGoogleAuth={handleGoogleAuth}
                  loading={loading}
                  onSwitchForm={() => setActiveForm("login")}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-between p-4 border-t border-[#333333]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveForm("login")}
            disabled={activeForm === "login" || loading}
            className="text-white/60 hover:text-white hover:bg-[#8243ea]/20"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveForm("signup")}
            disabled={activeForm === "signup" || loading}
            className="text-white/60 hover:text-white hover:bg-[#8243ea]/20"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8243ea]/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#9a5dff]/10 rounded-full filter blur-3xl"></div>
      </div>
    </div>
  )
}

function LoginForm({
  onSubmit,
  onGoogleAuth,
  loading,
  onSwitchForm,
}: {
  onSubmit: (e: React.FormEvent) => void
  onGoogleAuth: () => void
  loading: boolean
  onSwitchForm: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#0c070b] border-[#333333] text-white focus:border-[#8243ea]"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <a href="#" className="text-xs text-[#8243ea] hover:underline">
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#0c070b] border-[#333333] text-white focus:border-[#8243ea]"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full bg-[#8243ea] hover:bg-[#9a5dff]" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#333333]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-[#1f2416] text-white/60">or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-[#333333] text-white hover:bg-[#333333]/50"
        onClick={onGoogleAuth}
        disabled={loading}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="text-center mt-6">
        <p className="text-white/60 text-sm">
          Don't have an account?{" "}
          <button type="button" onClick={onSwitchForm} className="text-[#8243ea] hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </form>
  )
}

function SignupForm({
  onSubmit,
  onGoogleAuth,
  loading,
  onSwitchForm,
}: {
  onSubmit: (e: React.FormEvent) => void
  onGoogleAuth: () => void
  loading: boolean
  onSwitchForm: () => void
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-[#0c070b] border-[#333333] text-white focus:border-[#8243ea]"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-signup" className="text-white">
          Email
        </Label>
        <Input
          id="email-signup"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#0c070b] border-[#333333] text-white focus:border-[#8243ea]"
          placeholder="you@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password-signup" className="text-white">
          Password
        </Label>
        <Input
          id="password-signup"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-[#0c070b] border-[#333333] text-white focus:border-[#8243ea]"
          placeholder="••••••••"
        />
      </div>

      <Button type="submit" className="w-full bg-[#8243ea] hover:bg-[#9a5dff]" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#333333]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-[#1f2416] text-white/60">or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-[#333333] text-white hover:bg-[#333333]/50"
        onClick={onGoogleAuth}
        disabled={loading}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </Button>

      <div className="text-center mt-6">
        <p className="text-white/60 text-sm">
          Already have an account?{" "}
          <button type="button" onClick={onSwitchForm} className="text-[#8243ea] hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </form>
  )
}
