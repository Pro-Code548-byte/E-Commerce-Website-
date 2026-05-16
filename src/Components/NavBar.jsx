import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdStars } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    navigate(`/?search=${encodeURIComponent(trimmedTerm)}`);
    setSearchTerm("");
  };

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between gap-4 px-10 bg-white py-6">
        <NavLink to="/">
          <div className="flex gap-5 items-center">
            <HiMenu className="text-3xl" />
            <div className="flex items-center">
              <p className="font-bold text-3xl">JUMIA</p>
              <IoStarSharp className="text-white bg-orange-400 rounded-full text-2xl px-1" />
            </div>
          </div>
        </NavLink>

        <div className="flex flex-1 max-w-2xl items-center rounded-3xl bg-gray-100 py-1 px-3">
          <BiSearchAlt2 className="text-lg font-bold text-slate-500" />
          <form onSubmit={handleSearchSubmit} className="flex flex-1">
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              type="text"
              placeholder="Search products, brands and categories"
              className="ml-3 w-full bg-transparent outline-none"
            />
            <button
              type="submit"
              className="ml-3 rounded-3xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3">
          <NavLink to="/account">
            <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer">
              <IoPersonOutline className="text-2xl font-bold " />
              <p className="font-bold">Account</p>
              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </NavLink>

          <NavLink to="/contact">
            <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer">
              <IoMdHelpCircleOutline className="text-2xl font-bold " />
              <p className="font-bold">Help</p>
              <RiArrowDropDownLine className="text-2xl" />
            </div>
          </NavLink>

          <NavLink to="/products">
            <div className="flex items-center gap-1 hover:text-orange-400 cursor-pointer">
              <PiShoppingCartSimpleBold className="text-2xl font-bold " />
              <p className="font-bold">Cart</p>
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
