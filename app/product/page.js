"use client";

import { Breadcrumbs } from "@material-tailwind/react";


  export default function Product() {
    
    return (
      <div className="w-full">
        <div className="w-full max-w-[80%] py-20 mx-auto p-5 gap-5 grid grid-cols-12" >
        <Breadcrumbs>
          <a href="#" className="opacity-60">
            Products
          </a>
          <a href="#" className="opacity-60">
            Vaastu
          </a>
          <a href="#">
            dfghdfh
          </a>
        </Breadcrumbs>
        <div className="w-full grid gap-10 grid-cols-12">
          <div className="col-span-5">
            
          </div>
        </div>
        </div>
      </div>
    );
  }