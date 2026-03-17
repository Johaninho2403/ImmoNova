import React from 'react'
import { Skeleton } from '@mui/material'

const ImageListSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden flex gap-2 w-full">
      <div className="w-[60%] h-40 sm:h-50 md:h-100">
        <Skeleton variant="rectangular" className="w-full! h-full!" />
      </div>
      <div className="flex flex-col justify-between w-[40%]">
        <div className="flex gap-2 w-full h-19 sm:h-24 md:h-49">
          <Skeleton variant="rectangular" className="w-full! h-full!" />
          <Skeleton variant="rectangular" className="w-full! h-full!" />
        </div>
        <div className="flex gap-2 w-full h-19 sm:h-24 md:h-49">
          <Skeleton variant="rectangular" className="w-full! h-full!" />
          <Skeleton variant="rectangular" className="w-full! h-full!" />
        </div>
      </div>
    </div>
  );
}

export default ImageListSkeleton