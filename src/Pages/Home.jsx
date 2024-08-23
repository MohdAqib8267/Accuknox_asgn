

import {Check,Star} from "lucide-react";
import React from "react";


const Banner = () => {

  return (
    <div className="bg-slate-50 min-h-screen">
      <section>
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16 pb-10">
          <div className="flex flex-col lg:flex-col items-center py-20 gap-4">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-4xl md:text-5xl text-gray-900 !leading-tight mt-2">
              Welcome to <span className="text-green-500">the Your</span> Space!
            </h2>
            <p className="text-gray-600 text-2xl md:text-3xl">
              Just Click on <span className="bg-zinc-800 text-white">Dashboard...</span>
            </p>
          </div>
        </div>
      </section>
      
     
      <section className="bg-slate-200 py-24">
        <div className="h-full mx-auto max-w-screen-xl px-2.5 md:px-20 flex flex-col justify-center items-center gap-16">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <h2 className="relative w-fit text-center tracking-tight items-center justify-center font-bold text-5xl md:text-6xl text-gray-900 !leading-tight order-1  mt-2">
              What Our{" "}
              <span className="relative px-2">
                Customer
              </span>{" "}
              Says
            </h2> 
          </div>
          <div className="mx-auto grid grid-cols-1 px-4 max-w-2xl lg:max-w-none lg:grid-cols-2 lg:mx-0 gap-y-16 ">
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The bag is spacious and incredibly well-made. I’ve received
                  multiple compliments on the color and style.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    After three months of daily use
                  </span>
                  ,the stitching is still intact, and the material hasn't worn
                  out. My previous bag showed signs of wear within a few weeks.
                  Highly recommend this one!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jack</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col col-span-1 gap-5 lg:pr-8 xl:pr-20">
              <div className="flex gap-0.5">
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
                <Star className="h-4 w-4 text-green-600 fill-green-600" />
              </div>
              <div className="text-lg leading-8">
                <p>
                  "The watchband fits perfectly and is super comfortable. I've
                  had it for almost three months, and the material still looks
                  brand new.{" "}
                  <span className="p-0.5 bg-slate-800 text-white">
                    With my last band
                  </span>
                  , the color started to fade within a month. I’ve gotten
                  several compliments on the sleek design. Very pleased with
                  this purchase!"
                </p>
              </div>
              <div className="flex space-x-3">
                <img
                  className="w-19 h-10 rounded-full"
                  src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.47776910.1722433886&semt=ais_hybrid"
                  alt=""
                />
                <div>
                  <p className="font-semibold">Jonathan</p>
                  <div className="flex gap-1.5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3px] text-green-600" />
                    <p className="text-sm">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
