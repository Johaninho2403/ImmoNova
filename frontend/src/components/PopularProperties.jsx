import React from 'react'
import { properties } from '../assets/assets';
import PropertyCard from './PropertyCard';

const PopularProperties = () => {
  return (
    <div className="px-2.5 md:px-[5%] lg:px-[10%]">
      <h2 className="my-10 text-center font-semibold text-3xl">Popular Properties</h2>
      <div className="grille gap-2 sm:gap-5">
        {properties.map(item => (
            <PropertyCard key={item.id} {...item}/>
        ))}
      </div>
    </div>
  );
}

export default PopularProperties