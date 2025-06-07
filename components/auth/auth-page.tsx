"use client"

import type React from "react"

import { useState, useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, ContactShadows, Text, Html } from "@react-three/drei"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import * as THREE from "three"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)

  return (
    <div className="h-screen w-full bg-[#0b021c] overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={<LoadingFallback />}>
          <color attach="background" args={["#0b021c"]} />
          <fog attach="fog" args={["#0b021c", 10, 20]} />
          <Environment preset="city" />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={0.5} />

          <group position={[0, -1, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <FloatingCube position={[0, 0, 0]} scale={1.5} />
              <Text position={[0, 3, 0]} fontSize={0.8} color="#8243ea" anchorX="center" anchorY="middle">
                SKILLYST
              </Text>
              <Text position={[0, 2.3, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
                RESUME BUILDER
              </Text>
            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={1.5} far={5} />

            <Html position={[0, 0, 2]} transform>
              <div className="w-[350px] h-[400px] flex items-center justify-center">
                <AuthForm mode={mode} setMode={setMode} loading={loading} setLoading={setLoading} />
              </div>
            </Html>
          </group>

          <OrbitingParticles count={100} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-xl">Loading 3D Scene...</div>
    </Html>
  )
}

function FloatingCube(props: any) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
      ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.1
    }
  })

  return (
    <mesh ref={ref} {...props}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color="#8243ea"
        emissive="#8243ea"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  )
}

function OrbitingParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 10 + 5
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 10

      temp.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        scale: Math.random() * 0.2 + 0.05,
        speed: Math.random() * 0.05 + 0.01,
        offset: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return

    particles.forEach((particle, i) => {
      const { position, scale, speed, offset } = particle
      const angle = state.clock.elapsedTime * speed + offset

      dummy.position.set(
        position[0] * Math.cos(angle) - position[2] * Math.sin(angle),
        position[1],
        position[0] * Math.sin(angle) + position[2] * Math.cos(angle),
      )

      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#8243ea" emissive="#8243ea" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function AuthForm({
  mode,
  setMode,
  loading,
  setLoading,
}: {
  mode: "login" | "signup"
  setMode: (mode: "login" | "signup") => void
  loading: boolean
  setLoading: (loading: boolean) => void
}) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl border border-white/20"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {mode === "login" ? "Welcome Back" : "Create Account"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
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
              className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#8243ea]"
              placeholder="John Doe"
            />
          </div>
        )}

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
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#8243ea]"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/20 border-white/20 text-white placeholder:text-white/50 focus:border-[#8243ea]"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" className="w-full bg-[#8243ea] hover:bg-[#9a5dff] text-white" disabled={loading}>
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : mode === "login" ? (
            "Sign In"
          ) : (
            "Sign Up"
          )}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-[#0b021c] text-white/60">or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10 bg-white/5"
          onClick={handleGoogleAuth}
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
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="ml-1 text-[#8243ea] hover:underline font-medium"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </form>
    </motion.div>
  )
}
