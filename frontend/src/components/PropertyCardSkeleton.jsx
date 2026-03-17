import React from "react";
import { Skeleton } from "@mui/material";

const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton
        variant="rectangular"
        className="w-full h-50! rounded-md!"
        animation="wave"
      />
      <Skeleton variant="rounded" className="w-7/10! h-2!" animation="wave" />
      <div className="flex justify-between">
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
      </div>
      <div className="flex justify-between">
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
        <Skeleton variant="rounded" className="w-15! h-2!" animation="wave" />
      </div>
      <Skeleton variant="rounded" className="w-7/10! h-3!" animation="wave" />
    </div>
  );
};

export default PropertyCardSkeleton;
