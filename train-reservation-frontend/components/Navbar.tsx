'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User, LogOut } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check localStorage for saved user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Refresh and go home
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-900 tracking-tighter">
          TrainHub
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            /* SHOW THIS IF LOGGED IN */
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                <User size={18} className="text-blue-900" />
                <span className="text-slate-700 font-semibold tracking-tight">
                  Welcome, <span className="text-blue-900">{user.firstName}</span>
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            /* SHOW THIS IF LOGGED OUT */
            <>
              <Link href="/login" className="text-slate-600 font-semibold hover:text-blue-900 px-4 py-2">
                Login
              </Link>
              <Link href="/signup" className="bg-blue-900 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-800 transition-all">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}