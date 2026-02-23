'use client'

import { useState } from 'react'
import { LogIn, Lock, Mail, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (response.ok) {
        const userData = await response.json()
        
        // 1. Store user info (This is what the Navbar looks for)
        localStorage.setItem('user', JSON.stringify(userData))
        
        // 2. Redirect immediately (Navbar will now show "Welcome, Name")
        window.location.href = '/' 
      } else {
        const error = await response.text()
        alert(error)
      }
    } catch (err) {
      alert("Server is down. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-900 rounded-2xl mb-4 text-white">
            <LogIn size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="email" 
              required 
              className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-blue-900 bg-slate-50 focus:bg-white transition-all" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              type="password" 
              required 
              className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-blue-900 bg-slate-50 focus:bg-white transition-all" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-900 text-white p-4 rounded-xl font-bold hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-500">
            Don't have an account? <Link href="/signup" className="text-blue-900 font-bold hover:underline">Sign Up</Link>
          </p>
          <hr className="border-slate-100" />
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 inline-block transition-colors">
            ← Back to Search
          </Link>
        </div>
      </div>
    </div>
  )
}