'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2, MapPin, Calendar } from 'lucide-react'
import gsap from 'gsap'
import TrainCard from '../components/TrainCard'

export default function Home() {
  const [fromCity, setFromCity] = useState('')
  const [toCity, setToCity] = useState('')
  const [date, setDate] = useState('')
  const [trainClass, setTrainClass] = useState('ALL')
  const [quota, setQuota] = useState('GENERAL')
  const [pwdConcession, setPwdConcession] = useState(false)
  const [flexDate, setFlexDate] = useState(false)
  const [railPass, setRailPass] = useState(false)
  const [trains, setTrains] = useState([])
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/stations')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setStations(data) })
      .catch(err => console.error("Error loading stations:", err))
  }, [])

  const swapCities = () => {
    setFromCity(toCity)
    setToCity(fromCity)
  }

  const handleSearch = async () => {
    if (!fromCity || !toCity || !date) return alert('Please enter all details')
    setLoading(true)
    setSearched(true)

    try {
      const response = await fetch('http://127.0.0.1:8080/api/trains')
      const allTrains = await response.json()

      if (!Array.isArray(allTrains)) {
        console.error("Backend Error: Expected array but got:", allTrains)
        setTrains([])
        return
      }

      const results = allTrains.filter((t: any) =>
        (t.sourceStation?.stationName?.toLowerCase().includes(fromCity.toLowerCase()) ||
          t.sourceStation?.city?.toLowerCase().includes(fromCity.toLowerCase())) &&
        (t.destStation?.stationName?.toLowerCase().includes(toCity.toLowerCase()) ||
          t.destStation?.city?.toLowerCase().includes(toCity.toLowerCase()))
      )

      setTrains(results)

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
    <div className="min-h-screen flex items-center px-10 py-10"
      style={{
        backgroundImage: "url('/images1.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#b8ddf0'
      }}>

      <datalist id="db-stations">
        {stations.map((s: any) => (
          <option key={s.stationId} value={s.stationName} />
        ))}
      </datalist>

      {/* Left Column: Card + Results */}
      <div className="flex flex-col gap-6 w-full max-w-2xl">

      {/* Booking Window Card */}
      <div className="w-full bg-white rounded-lg shadow-2xl overflow-hidden">

        {/* Top Nav Bar */}
        <div className="grid grid-cols-2 border-b border-blue-900">
          <button className="flex items-center justify-center gap-2 bg-blue-900 text-white font-semibold text-sm py-3 hover:bg-blue-800 transition-colors">
            <span className="text-lg">☑</span> PNR STATUS
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-900 text-white font-semibold text-sm py-3 hover:bg-blue-800 transition-colors border-l border-blue-700">
            <span className="text-lg">📋</span> CHARTS / VACANCY
          </button>
        </div>

        {/* Main Content */}
        <div className="px-10 py-8">
          <h2 className="text-center text-3xl font-bold text-blue-900 tracking-widest mb-7 uppercase">
            Book Ticket
          </h2>

          {/* From / To Row */}
          <div className="flex items-center gap-2 mb-4">
            {/* From */}
            <div className="flex-1 relative">
              <label className="text-xs text-gray-500 font-medium mb-1 block">From</label>
              <div className="flex items-center border-2 border-blue-400 rounded focus-within:border-blue-700 bg-white transition-colors">
                <span className="pl-3 text-blue-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                  </svg>
                </span>
                <input
                  list="db-stations"
                  className="w-full px-2 py-3 text-sm font-medium text-gray-800 outline-none bg-transparent placeholder-gray-400"
                  placeholder="From"
                  value={fromCity}
                  onChange={e => setFromCity(e.target.value)}
                />
              </div>
            </div>

            {/* Swap Button */}
            <button
              onClick={swapCities}
              className="mt-5 p-2 rounded-full bg-blue-100 hover:bg-blue-200 border border-blue-300 text-blue-700 transition-all hover:rotate-180 duration-300"
              title="Swap stations"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M8 3 L3 8 L8 13"/><path d="M3 8 h18"/><path d="M16 11 l5 5 l-5 5"/><path d="M21 16 H3"/></svg>
            </button>

            {/* To */}
            <div className="flex-1 relative">
              <label className="text-xs text-gray-500 font-medium mb-1 block">&nbsp;</label>
              <div className="flex items-center border-2 border-blue-400 rounded focus-within:border-blue-700 bg-white transition-colors">
                <span className="pl-3 text-blue-500">
                  <MapPin size={16} />
                </span>
                <input
                  list="db-stations"
                  className="w-full px-2 py-3 text-sm font-medium text-gray-800 outline-none bg-transparent placeholder-gray-400"
                  placeholder="To"
                  value={toCity}
                  onChange={e => setToCity(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Date / Class Row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Date */}
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">DD/MM/YYYY *</label>
              <div className="flex items-center border-2 border-blue-400 rounded focus-within:border-blue-700 bg-white transition-colors">
                <span className="pl-3 text-blue-500">
                  <Calendar size={16} />
                </span>
                <input
                  type="date"
                  className="w-full px-2 py-2.5 text-sm font-medium text-gray-800 outline-none bg-transparent"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Class */}
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">&nbsp;</label>
              <div className="flex items-center border-2 border-blue-400 rounded focus-within:border-blue-700 bg-white transition-colors">
                <span className="pl-3 text-blue-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </span>
                <select
                  className="w-full px-2 py-2.5 text-sm font-medium text-gray-800 outline-none bg-transparent cursor-pointer"
                  value={trainClass}
                  onChange={e => setTrainClass(e.target.value)}
                >
                  <option value="ALL">All Classes</option>
                  <option value="SL">Sleeper (SL)</option>
                  <option value="3A">AC 3 Tier (3A)</option>
                  <option value="2A">AC 2 Tier (2A)</option>
                  <option value="1A">AC First Class (1A)</option>
                  <option value="CC">AC Chair Car (CC)</option>
                  <option value="2S">Second Sitting (2S)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quota Row */}
          <div className="mb-5">
            <div className="w-1/2 pr-1.5">
              <div className="flex items-center border-2 border-blue-400 rounded focus-within:border-blue-700 bg-white transition-colors">
                <span className="pl-3 text-blue-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <select
                  className="w-full px-2 py-2.5 text-sm font-medium text-gray-800 outline-none bg-transparent cursor-pointer"
                  value={quota}
                  onChange={e => setQuota(e.target.value)}
                >
                  <option value="GENERAL">GENERAL</option>
                  <option value="TATKAL">TATKAL</option>
                  <option value="PREMIUM_TATKAL">PREMIUM TATKAL</option>
                  <option value="LADIES">LADIES</option>
                  <option value="SENIOR_CITIZEN">SENIOR CITIZEN</option>
                </select>
              </div>
            </div>
          </div>

          {/* Concessions Row */}
          <div className="flex items-center gap-5 mb-6 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={pwdConcession}
                onChange={e => setPwdConcession(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700"
              />
              <span className="text-xs font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                Person With Disability Concession
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={flexDate}
                onChange={e => setFlexDate(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700"
              />
              <span className="text-xs font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                Flexible With Date
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={railPass}
                onChange={e => setRailPass(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-blue-700"
              />
              <span className="text-xs font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                Railway Pass Concession
              </span>
            </label>
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-base px-16 py-3 rounded-full shadow-lg shadow-orange-400/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : null}
              Search Trains
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="w-full space-y-4">
          {trains.map((t: any, i) => (
            <div key={t.trainId} ref={el => { cardsRef.current[i] = el }}>
              <TrainCard train={t} />
            </div>
          ))}
          {!loading && trains.length === 0 && (
            <div className="text-center py-10 bg-white/80 backdrop-blur rounded-2xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">No trains found for this route.</p>
            </div>
          )}
        </div>
      )}

      </div>{/* end left column */}
    </div>
  )
}