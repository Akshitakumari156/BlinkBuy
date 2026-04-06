import React, { useState } from "react";
import SearchBox from "../Navbar/SearchBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import UserProfileDropdown from "../Navbar/UserProfileDropdown";

const Navbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [showDropDown, setShowDropDown] = useState(false);
  const naviagte = useNavigate();
  const location = useLocation();
  const { allProducts } = useSelector((state) => state.wishlist);



  return (
    <div className="relative">
      <header className="bg-gray-900 px-3 py-2 flex items-center gap-6 justify-center border-b-[1px] border-gray-700">
        <Link to={"/"}>
          <h2 className="flex items-center font-bold text-3xl">
            <p> Smart </p>
            <p className="text-5xl text-yellow-400 ">X</p>
          </h2>
        </Link>
        <SearchBox />
        <nav className="flex items-center gap-6 font-semibold">
          <Link
            to={"/about-us"}
            className={`${
              location.pathname === "/about-us"
                ? "text-yellow-400 text-[18px]"
                : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to={"/contact-us"}
            className={`${
              location.pathname === "/contact-us"
                ? "text-yellow-400 text-[18px]"
                : ""
            }`}
          >
            Contact Us
          </Link>

          {token ? (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                setShowDropDown((prev) => !prev);
              }}
            >
              <img
                src={userData?.profilePicture}
                alt="userProfilePicture"
                className="h-10 w-10 rounded-full object-cover"
              />
              <IoIosArrowDown size={30} />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to={"/login"}
                className="bg-slate-950 px-4 py-2 rounded-md transition-all duration-300 
                    hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to={"/signup"}
                className="bg-slate-950 px-4 py-2 rounded-md transition-all duration-300 
                    hover:bg-slate-800"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="relative cursor-pointer"
          onClick={()=>{naviagte("/wishlist-products")}}>
            <FaRegHeart size={40}  />
            {
              allProducts?.length > 0 && <p className="absolute top-2 left-[15px] text-yellow-400 font-semibold"> {allProducts?.length}</p>
            }
          </div>

          <div
            className={`flex items-center gap-1 bg-gray-950 rounded-full px-4 py-2 cursor-pointer
                transition-all duration-300 hover:bg-slate-800 ${
                  location.pathname === "/upload-product" ? "bg-slate-800" : ""
                }`}
            onClick={() => {
              naviagte("/upload-product");
            }}
          >
            <FaPlus size={23} />
            <p className="font-semibold text-[18px]">SELL</p>
          </div>
        </nav>
      </header>
      {showDropDown && (
        <div className="absolute z-50 right-[260px] bg-white text-black w-[200px] flex flex-col rounded-md">
          <div className="bg-white h-6 w-6 self-end rotate-45 -mt-3 mr-3"></div>
          <UserProfileDropdown setShowDropDown={setShowDropDown} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
