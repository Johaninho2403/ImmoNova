import React from 'react'
import { Skeleton } from '@mui/material'

const GridSkeleton = () => {
  return (
    <div className="px-2.5 flex justify-between md:px-[5%] lg:px-[10%] gap-0 sm:gap-4 w-full">
      <Skeleton
        variant="rectangular"
        className="w-full! sm:w-1/2! md:w-1/3! lg:w-1/4! rounded-md! h-50!"
      />
      <Skeleton
        variant="rectangular"
        className="w-0! sm:w-1/2! md:w-1/3! lg:w-1/4! rounded-md! h-50!"
      />
      <Skeleton
        variant="rectangular"
        className="w-0! sm:w-0! md:w-1/3! lg:w-1/4! rounded-md h-50!"
      />
      <Skeleton
        variant="rectangular"
        className="w-0! sm:w-0! md:w-0! lg:w-1/4! rounded-md! h-50!"
      />
    </div>
  );
}

export default GridSkeleton