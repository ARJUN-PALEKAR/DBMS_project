'use client'

import { Train, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TrainCard({ train }: { train: any }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl hover:shadow-xl transition-all mb-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        
        {/* Left: Basic Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-bold text-slate-900">{train.trainName}</h3>
            <span className="text-xs font-mono text-slate-400">#{train.trainNumber}</span>
          </div>

          <div className="flex items-center justify-between text-slate-600 bg-slate-50 p-4 rounded-2xl">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">From</p>
              <p className="text-lg font-bold text-blue-900">{train.sourceStation?.stationCode}</p>
              <p className="text-xs">{train.sourceStation?.stationName}</p>
            </div>
            <ArrowRight size={20} className="text-slate-300" />
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">To</p>
              <p className="text-lg font-bold text-blue-900">{train.destStation?.stationCode}</p>
              <p className="text-xs">{train.destStation?.stationName}</p>
            </div>
          </div>

          {/* DYNAMIC CLASSES & SEATS */}
          <div className="mt-6 flex flex-wrap gap-3">
            {train.classes?.map((cls: any) => (
              <div key={cls.classId} className="border border-slate-100 rounded-xl p-3 bg-white shadow-sm min-w-[100px] hover:border-blue-400 cursor-pointer transition-colors">
                <p className="text-xs font-bold text-slate-400">{cls.classType}</p>
                <p className="text-lg font-bold text-slate-900">₹{cls.basePrice}</p>
                <p className={`text-[10px] font-bold ${cls.availableSeats > 20 ? 'text-emerald-500' : 'text-orange-500'}`}>
                  {cls.availableSeats} SEATS
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Booking Action */}
        <div className="lg:w-48 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-slate-100 pt-6 lg:pt-0">
          <p className="text-sm text-slate-400 mb-1">Starting from</p>
          <p className="text-4xl font-black text-slate-900 mb-6">₹{train.price}</p>
          <Link 
            href="/login" 
            className="w-full text-center bg-blue-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all"
          >
            Book Now
          </Link>
        </div>

      </div>
    </div>
  )
}