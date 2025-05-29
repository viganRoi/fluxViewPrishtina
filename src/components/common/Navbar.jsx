import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getWishlistCount } from "../../features/wishList/WishlistSlice";
import { useSelector } from "react-redux";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiTextAlignRightThin } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { PiPlayThin } from "react-icons/pi";
import "./style.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wishListItemCount = useSelector(getWishlistCount);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
        setIsDropdownOpen(false);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`w-screen fixed top-0 z-50 transition-nav ${isScrolled ? "bg-brand" : "bg-transparent"
          }`}
      >
        <div className="max-w-11/12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="text-2xl font-serif font-bold transition"
              >
                <img
                  src="/assets/images/brand/logoW.svg"
                  alt="logo"
                  className="h-10"
                />
              </NavLink>
            </div>
            <div className="hidden xl:flex space-x-8 items-center">
              <NavLink to="/" className={`text-white text-nowrap`}>
                Ballina
              </NavLink>
              <NavLink to="/about" className={`text-white text-nowrap`}>
                Rreth Nesh
              </NavLink>
              <NavLink to="/commercial" className={`text-white text-nowrap`}>
                Afarizmi
              </NavLink>
              <NavLink to="/parking" className={`text-white text-nowrap`}>
                Parkingu
              </NavLink>
              <NavLink to="/gallery" className={`text-white text-nowrap`}>
                Galeria
              </NavLink>
              <NavLink to="/news" className={`text-white text-nowrap`}>
                Lajme & Evente
              </NavLink>
              <NavLink to="/contact" className={`text-white text-nowrap`}>
                Kontakti
              </NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <button className="relative w-[35px] h-[35px] rounded-[50px] border border-gold duration-75 flex items-center justify-center">
                <PiPlayThin className="fill-white text-2xl" />
              </button>
              <NavLink
                to="/wishlist"
                className="relative w-[35px] h-[35px] rounded-[50px] border border-gold duration-75 flex items-center justify-center"
              >
                {wishListItemCount > 0 && (
                  <span className="absolute top-[-10px] right-[-5px] bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishListItemCount}
                  </span>
                )}
                {wishListItemCount > 0 ? (
                  <IoIosHeart className="fill-white text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-white text-2xl" />
                )}
              </NavLink>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-12 py-2 border border-gold bg-transparent text-white rounded-full"
                >
                  Ndërtesa
                </button>
                <div
                  className={`absolute right-0 mt-4 w-96 h-48 bg-brand border border-gold rounded-lg shadow-lg ${isDropdownOpen ? "flex" : "hidden"} justify-between dropdown-transition ${isDropdownOpen ? "dropdown-transition-enter" : ""
                    }`}
                >
                  <NavLink
                    to="/buildings"
                    className="block w-1/2 h-full flex flex-col items-center justify-center text-white hover:bg-gold hover:text-white rounded-l-md duration-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <p className="text-lg certon">Ndërtesa</p>
                    <img
                      src="/assets/images/hero/nav.png"
                      alt=""
                      className="absolute w-1/2 bottom-0 rounded-r-md"
                    />
                    <img
                      src="/assets/svgs/loop.svg"
                      alt=""
                      className="absolute h-40 bottom-0 right-0 rounded-r-md"
                    />
                  </NavLink>
                  <NavLink
                    to="/apartments"
                    className="block w-1/2 h-full flex flex-col items-center justify-center text-white hover:bg-gold hover:text-white rounded-r-md duration-300 overflow-hidden"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <p className="text-lg certon">Apartamente</p>
                    <img
                      src="/assets/svgs/loop.svg"
                      alt=""
                      className="absolute h-40 bottom-0 right-0 rounded-r-md"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="flex xl:hidden gap-2">
              <NavLink
                to="/wishlist"
                className="relative w-8 h-8 sm:w-[35px] sm:h-[35px] rounded-full border border-gold duration-75 flex items-center justify-center"
              >
                {wishListItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {wishListItemCount}
                  </span>
                )}

                {wishListItemCount > 0 ? (
                  <IoIosHeart className="fill-white text-lg sm:text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
                )}
              </NavLink>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <PiTextAlignRightThin
                  className={`fill-white text-3xl`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-full bg-gold z-[9999] flex flex-col items-center">
          <div className="w-full flex justify-end items-center p-4">
            <NavLink
              to="/wishlist"
              className="relative w-8 h-8 sm:w-[35px] sm:h-[35px] rounded-full border border-white duration-75 flex items-center justify-center"
            >
              {wishListItemCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:top-[-10px] sm:right-[-5px] bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {wishListItemCount}
                </span>
              )}

              {wishListItemCount > 0 ? (
                <IoIosHeart className="fill-white text-lg sm:text-2xl" />
              ) : (
                <IoIosHeartEmpty className="fill-white text-lg sm:text-2xl" />
              )}
            </NavLink>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-4xl"
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className=" w-11/12 flex flex-col items-start">
            <div className="w-full flex flex-col items-start gap-2 border-y p-2">
              <NavLink
                to="/"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Ballina
              </NavLink>
              <NavLink
                to="/about"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Rreth Nesh
              </NavLink>
              <NavLink
                to="/gallery"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Galeria
              </NavLink>
              <NavLink
                to="/parking"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Parkingu
              </NavLink>
              <NavLink
                to="/commercial"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Afarizmi
              </NavLink>
              <NavLink
                to="/news"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Lajme & Evente
              </NavLink>
              <NavLink
                to="/apartments"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Apartamente
              </NavLink>
              <NavLink
                to="/contact"
                className="text-white text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakti
              </NavLink>
            </div>
            <div className="h-full w-full relative flex items-center">
              <img
                src="/assets/images/renderat/012pp.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                onClick={() => {
                  navigate("/buildings");
                  setIsMenuOpen(false);
                }}>
                <p className="text-white text-2xl certon">Ndërtesa</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-20 w-full text-center">
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
            <p className="text-white mt-4">
              Privacy Policy · Terms and Conditions
            </p>
            <p className="text-white">
              &copy; 2024 Foleja. Te drejtat e rezervuara.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
