"use client"
import React from "react";
import { Rating, Typography } from "@material-tailwind/react";
 
export function Ratings() {
  const [rated, setRated] = React.useState(4);
 
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      {rated}.7
      <Rating value={4} onChange={(value) => setRated(value)} />
      <Typography color="blue-gray" className="font-medium text-sm text-blue-gray-500">
        (134 Reviews)
      </Typography>
    </div>
  );
}