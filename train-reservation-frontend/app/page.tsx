'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, MapPin, Calendar } from 'lucide-react'
import gsap from 'gsap'
import TrainCard from '../components/TrainCard'

export default function Home() {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [trains, setTrains] = useState([])
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // Load stations from Database on page load
  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/stations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setStations(data)
      })
      .catch(err => console.error("Error loading stations:", err))
  }, [])

  const handleSearch = async () => {
    if (!fromCity || !toCity || !date) return alert('Please enter all details')
    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch('http://127.0.0.1:8080/api/trains')
      const allTrains = await response.json()
      
      // SAFETY GUARD: Check if backend actually sent an array
      if (!Array.isArray(allTrains)) {
        console.error("Backend Error: Expected array but got:", allTrains)
        setTrains([])
        return
      }
      
      // Strict filter using Optional Chaining to prevent "undefined" errors
      const results = allTrains.filter((t: any) => 
        (t.sourceStation?.stationName?.toLowerCase().includes(fromCity.toLowerCase()) || 
         t.sourceStation?.city?.toLowerCase().includes(fromCity.toLowerCase())) &&
        (t.destStation?.stationName?.toLowerCase().includes(toCity.toLowerCase()) || 
         t.destStation?.city?.toLowerCase().includes(toCity.toLowerCase()))
      )
      
      setTrains(results)

      // GSAP Animation
      setTimeout(() => {
        if (cardsRef.current.length > 0) {
          gsap.fromTo(cardsRef.current, 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
          )
        }
      }, 50)
    } catch (error) {
      console.error("Fetch failed:", error)
      setTrains([])
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <datalist id="db-stations">
        {stations.map((s: any) => (
          <option key={s.stationId} value={s.stationName} />
        ))}
      </datalist>

      <section>
        <h1 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">Where to?</h1>
        
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              list="db-stations" 
              className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-blue-900 bg-slate-50 focus:bg-white transition-all" 
              placeholder="From Station" 
              value={fromCity} 
              onChange={e => setFromCity(e.target.value)} 
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input 
              list="db-stations" 
              className="w-full pl-10 p-3 border border-slate-200 rounded-xl outline-blue-900 bg-slate-50 focus:bg-white transition-all" 
              placeholder="To Station" 
              value={toCity} 
              onChange={e => setToCity(e.target.value)} 
            />
          </div>

          <input 
            type="date" 
            className="p-3 border border-slate-200 rounded-xl outline-blue-900 bg-slate-50 focus:bg-white transition-all" 
            value={date} 
            onChange={e => setDate(e.target.value)} 
          />

          <button 
            onClick={handleSearch} 
            disabled={loading}
            className="bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Search Trains'}
          </button>
        </div>
      </section>

      {searched && (
        <div className="mt-12 space-y-4">
          {trains.map((t: any, i) => (
            <div key={t.trainId} ref={el => { cardsRef.current[i] = el }}>
              <TrainCard train={t} />
            </div>
          ))}
          {!loading && trains.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No trains found in your database for this route.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}