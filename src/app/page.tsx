'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'


export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const particles = useRef<HTMLDivElement[]>([])
  
  const MAX_PARTICLES = 50  // Maximum particles allowed
  const PARTICLE_INTERVAL = 200  // New particle every 200ms

  const handleTestLogin = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      router.push('/pages/home')
    }, 1000)
  }

  useEffect(() => {
    const createParticle = () => {
      // Don't create new particles if we're at the maximum
      if (particles.current.length >= MAX_PARTICLES) {
        return
      }

      const particle = document.createElement('div')
      particle.classList.add('particle')
      
      const size = Math.random() * 15 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      
      particle.style.left = `${Math.random() * 100}vw`
      particle.style.animation = `float-up ${Math.random() * 30 + 2}s linear infinite`
      
      document.body.appendChild(particle)
      particles.current.push(particle)
      
      // Remove particle after animation
      setTimeout(() => {
        particle.remove()
        particles.current = particles.current.filter(p => p !== particle)
      }, 30000)
    }

    const intervalId = setInterval(createParticle, PARTICLE_INTERVAL)

    // Cleanup function
    return () => {
      clearInterval(intervalId)
      // Remove all remaining particles
      particles.current.forEach(particle => particle.remove())
      particles.current = []
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#1a1f2c] to-[#2a303c] flex items-center justify-center p-4 overflow-hidden">
      <Card className="w-full max-w-md bg-[#232834]/90 border-gray-800 z-10">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-xDxKIwL6pL82JMIPzX2rqreFRXl05i.png"
              height={48}
              width={48}
              alt="AnimeHub Logo"
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-white">Welcome to AnimeHub</h2>
          <p className="text-zinc-200 text-center">Enter your email to sign in to your account</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#2a303c]">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-[#3a4356]">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-[#3a4356]">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="bg-[#2a303c] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="bg-[#2a303c] border-gray-700 text-white"
                    />
                  </div>
                  <Button 
                    className="w-full bg-red-500 hover:bg-red-600 text-white" 
                    onClick={handleTestLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="bg-[#2a303c] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      className="bg-[#2a303c] border-gray-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm" className="text-white">Confirm Password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      className="bg-[#2a303c] border-gray-700 text-white"
                    />
                  </div>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Sign Up
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#232834] px-2 text-zinc-300">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="bg-[#2a303c] border-gray-700 hover:bg-[#343d4d] text-white">
              <Github className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" className="bg-[#2a303c] border-gray-700 hover:bg-[#343d4d] text-white">
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-zinc-300 w-full">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-zinc-100">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-zinc-100">
              Privacy Policy
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

