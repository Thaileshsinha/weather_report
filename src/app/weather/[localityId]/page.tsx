"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import allData from "@/data";
import { title } from "process";

interface WeatherInterface {
  temperature?: number;
  humidity?: number;
  wind_speed?: number;
  wind_direction?: number;
  rain_intensity?: number;
  rain_accumulation?: number;
}

interface PageProps {
  params: {
    localityId: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [weatherDetails, setWeatherDetails] = useState<WeatherInterface>({
    temperature: 0,
    humidity: 0,
    wind_speed: 0,
    wind_direction: 0,
    rain_intensity: 0,
    rain_accumulation: 0,
  });

  const { localityId } = params;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data`,
          {
            params: { locality_id: localityId },
            headers: { "X-Zomato-Api-Key": "ae653debb3535268c1e5fe19d3575ab2" },
          }
        );

        setWeatherDetails(response.data.locality_weather_data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, [localityId]);

  let cityName: string = "";
  let localityName: string = "";

  allData.filter((item: any) =>
    item.localityId === localityId
      ? ((cityName = item.cityName), (localityName = item.localityName))
      : null
  );

  const detailsArry = [
    {
      title: "Temperature",
      value: weatherDetails.temperature,
      imagePath: "/temperature.png",
      alt: "Temperature",
      unit: "°C",
    },
    {
      title: "Humidity",
      value: weatherDetails.humidity,
      imagePath: "/humidity.png",
      alt: "Humidity",
      unit: "%",
    },
    {
      title: "Wind Speed",
      value: weatherDetails.wind_speed,
      imagePath: "/wind_3.png",
      alt: "Wind Speed",
      unit: "km/h",
    },
    {
      title: "Wind Direction",
      value: weatherDetails.wind_direction,
      imagePath: "/wind_2.png",
      alt: "Wind Direction",
      unit: "°",
    },
    {
      title: "Rain Intensity",
      value: weatherDetails.rain_intensity,
      imagePath: "/rain_intensity.png",
      alt: "Rain Intensity",
      unit: "mm/h",
    },
    {
      title: "Rain Accumulation",
      value: weatherDetails.rain_accumulation,
      imagePath: "/rain_accumulation.png",
      alt: "Rain Accumulation",
      unit: "mm",
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <h1 className="text-[24px] font-bold m-4">
          Location: {cityName} {localityName}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {detailsArry.map((item, index) => (
            <div
              className="flex justify-center flex-col shadow-md rounded-[20px] bg-white p-6"
              key={index}
            >
              <h3 className="text-[20px] font-semibold mb-4">{item.title}</h3>
              <div className="flex justify-between">
                <div className="">
                  <Image
                    src={item.imagePath}
                    alt={item.alt}
                    width={80}
                    height={80}
                  />
                </div>
                <p className="text-[20px] ">
                  {item.value}
                  <span className="text-[18px] ">{item.unit}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
