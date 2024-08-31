"use client";
import { useEffect, useState } from "react";
import allData from "@/data";
import { useRouter } from "next/navigation";

interface SuggestionInputProps {
  smWidth: string;
  mdWidth: string;
  lgWidth: string;
}

interface LocationValue {
  cityName?: string;
  localityName: string;
  localityId?: string;
  latitude?: number;
  longitude?: number;
  device_type?: string;
}

export default function SuggestionInput({
  smWidth,
  mdWidth,
  lgWidth,
}: SuggestionInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<LocationValue[]>([]);
  const [localStorageVal, setLocalStorageVal] = useState<LocationValue[]>([]);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  const fetchSuggestions = (inputValue: string) => {
    const data = allData.filter(
      (item) =>
        item.localityName.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.cityName?.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(data);
  };

  useEffect(() => {
    if (inputValue.length > 1) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  useEffect(() => {
    const storedLocations = localStorage.getItem("locality");
    if (storedLocations) {
      setLocalStorageVal(JSON.parse(storedLocations));
    }
  }, []);

  const handleLocationClick = (val: LocationValue) => {
    const updatedLocalStorageVal = [val, ...localStorageVal.slice(0, 7)];

    localStorage.setItem("locality", JSON.stringify(updatedLocalStorageVal));
    setLocalStorageVal(updatedLocalStorageVal);
    router.push(`/weather/${val.localityId}`);
  };

  return (
    <div
      className={`relative bg-white  border border-[#DFE1E5] rounded-[50px] p-3 w-[${smWidth}] md:w-[${mdWidth}] lg:w-[${lgWidth}]`}
    >
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none w-full bg-white"
        value={inputValue}
        onChange={handleInputChange}
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white z-10 shadow-lg mt-2 rounded-lg overflow-y-auto max-h-60">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-gray-700"
              onClick={() => handleLocationClick(suggestion)}
            >
              <span className="font-semibold">{suggestion.cityName}</span> -{" "}
              {suggestion.localityName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
