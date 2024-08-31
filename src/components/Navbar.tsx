import React from "react";
import Image from "next/image";
import SuggestionInput from "./SuggestionInput";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <>
      <div className="bg-white m-4 px-5 py-3 shadow-md rounded-[30px] ">
        <div className="flex justify-between">
          <div className="rounded-[50px] cursor-pointer">
            <img
              src="https://photos.wellfound.com/startups/i/10207359-a7be47f12fd46cb410e459b52e9bac94-medium_jpg.jpg?buster=1723205348"
              width="50px"
              alt="logo"
              className="rounded-[50px]"
              onClick={() => router.push("/")}
            />
          </div>
          {/* <div className="relative bg-gray-200 rounded-[50px] p-3 w-[170px] md:w-[300px] lg:w-[500px]">
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none w-full bg-gray-200"
            />
            <div className="absolute top-full left-0 right-0 bg-white z-10 shadow-lg mt-2 rounded-lg">
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
              <p className="p-2 hover:bg-gray-100 cursor-pointer">efds</p>
            </div>
          </div> */}

          <SuggestionInput smWidth="170px" mdWidth="300px" lgWidth="500px" />

          <div className="flex justify-between items-center">
            <Image
              src="/profile-pic.png"
              width={50}
              height={50}
              alt="profile"
            />
            <div className="ml-3 hidden md:block">
              <b>Thailesh Sinha</b>
              <p>+91 7224942677</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
