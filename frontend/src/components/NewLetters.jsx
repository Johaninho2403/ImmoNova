import React from 'react'

const NewLetters = () => {
  return (
    <div className="px-2.5 md:px-[5%] lg:px-[10%] my-20">
      <h1 className="text-3xl text-center font-medium mb-2.5">Never miss a deal</h1>
      <p className="text-slate-500 text-center mb-7.5">
        Subscribe to get the latest offers, new arrivals, and exclusive
        discounts
      </p>
      <form className="w-full max-w-150 flex mx-auto ">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email adress"
          className="flex-1 border py-3 border-slate-400 rounded-l-md px-2"
          required
        />
        <button className='bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-r-md px-2 sm:px-6'>Subscribe</button>
      </form>
    </div>
  );
}

export default NewLetters