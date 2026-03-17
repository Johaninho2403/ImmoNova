import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { properties } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const MyBookings = () => {
    const {checkIn, checkOut} = useContext(AppContext)
  return (
    <div>
      <Navbar />
      <div className="px-5 md:px-[5%] lg:px-[10%]">
        <h1 className="text-2xl font-medium my-5">My Bookings</h1>
        <div className="flex flex-col gap-y-4">
          {properties.map((item) => (
            <div className="flex gap-2 pb-4 border-b border-slate-300" key={item.id}>
              <div className="">
                <img
                  src={item.images[0]}
                  alt="property"
                  className="w-30 h-30 rounded-md object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <h2 className="font-medium text-sm sm:text-base line-clamp-1">{item.title}</h2>
                <div className="text-slate-400">
                  {new Date(checkIn).toLocaleDateString()} - {new Date(checkOut).toLocaleDateString()}
                </div>
                <div className="text-slate-400 text-sm sm:text-base">{item.adress}</div>
                <div className="flex gap-4 items-center">
                    <div className="bg-green-200 text-slate-800 text-sm p-2 rounded-md sm:text-base">Accepted</div>
                    <p className='text-slate-400'>XAF 20000</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyBookings