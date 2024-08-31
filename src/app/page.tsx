"use client";

import { useEffect, useState } from "react";
import allData from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SuggestionInput from "@/components/SuggestionInput";

interface LocationValue {
  cityName?: string;
  localityName: string;
  localityId?: string;
  latitude?: number;
  longitude?: number;
  device_type?: string;
}

export default function Home() {
  const router = useRouter();

  const colorArry = [
    "#84ee84",
    "#ee84cb",
    "#dc84ee",
    "#84b9ee",
    "#ee86c5",
    "#ee9286",
    "#86eed2",
    "#ee8686",
  ];

  const [localval, setLocalVal] = useState<LocationValue[]>([]);

  // Use useEffect to run client-side only code
  useEffect(() => {
    let v = localStorage.getItem("locality");
    setLocalVal(v ? JSON.parse(v) : []);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-white w-full h-[100vh] p-10">
        <Image
          src="https://photos.wellfound.com/startups/i/10207359-a7be47f12fd46cb410e459b52e9bac94-medium_jpg.jpg?buster=1723205348"
          alt="Next.js Logo"
          width={100}
          height={100}
          className="mb-4 rounded-full"
          priority
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-4  ">
          Search Weather with State or City
        </h1>
        <SuggestionInput smWidth="100%" mdWidth="100%" lgWidth="500px" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-6">
          {localval.length > 0 &&
            localval.map((item, index) => (
              <div
                key={index}
                className="flex justify-center flex-col items-center cursor-pointer hover:scale-105 duration-300"
                onClick={() => {
                  router.push(`/weather/${item.localityId}`);
                }}
              >
                <h1
                  className="text-white px-6 py-4 rounded-[50px] text-[18px]  "
                  style={{
                    backgroundColor: colorArry[index % colorArry.length],
                  }}
                >
                  {item.localityName[0].toUpperCase()}
                </h1>
                <p className="text-[14px] mt-3">{item.localityName}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
