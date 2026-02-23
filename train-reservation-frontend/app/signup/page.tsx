'use client'

import { useState } from 'react'
import { Plane } from 'lucide-react'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' })
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const res = await fetch('http://127.0.0.1:8080/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      alert("Registration Successful!"); window.location.href = '/login'
    } else {
      alert("Registration Failed!")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-900 rounded-2xl mb-4 text-white"><Plane size={32} /></div>
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
        </div>
        <div className="space-y-4">
          <input className="w-full p-3 border rounded-xl" placeholder="First Name" onChange={e => setFormData({...formData, firstName: e.target.value})} />
          <input className="w-full p-3 border rounded-xl" placeholder="Last Name" onChange={e => setFormData({...formData, lastName: e.target.value})} />
          <input className="w-full p-3 border rounded-xl" placeholder="Email" type="email" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input className="w-full p-3 border rounded-xl" placeholder="Phone" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input className="w-full p-3 border rounded-xl" placeholder="Password" type="password" onChange={e => setFormData({...formData, password: e.target.value})} />
          <button className="w-full bg-blue-900 text-white p-4 rounded-xl font-bold mt-4 hover:bg-blue-800 transition-all">Sign Up</button>
        </div>
        <p className="text-center mt-6 text-slate-500">Already have an account? <Link href="/login" className="text-blue-900 font-bold">Login</Link></p>
      </form>
    </div>
  )
}