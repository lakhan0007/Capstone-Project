import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assest/logo.png";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";


const Header = () => {
    const [showMenu, setShowMenu] = useState(false)
    const userData = useSelector((state) =>state.user)
    console.log(userData);
    const dispatch = useDispatch()


    const handelShowMenu = () => {
      setShowMenu(preve => !preve)
    }
     const handleLogout = () => {
        dispatch(logoutRedux())
        toast("LOGOUT SUCCESSFULLY")
     }
  return (
    <>
      <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
        {/* Destop */}

        <div className="flex items-center h-full justify-between">
          <Link to={""}>
            <div className="h-10">
              <img src={logo} className="h-full" />
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-7">
            <nav className="flex gap-4 md:gap-10 text-base md:text-lg">
              <Link to={""}>Home</Link>
              <Link to={"menu"}>Menu</Link>
              <Link to={"about"}>About</Link>
              <Link to={"contact"}>Contact</Link>
            </nav>
            <div className="text-2xl text-slate-600 relative" >
              <BsFillCartPlusFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
                0
              </div>
            </div>
            <div className="text-xl text-slate-600" onClick={handelShowMenu}>
              <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md" >
                {userData.image ? <img src={userData.image} className="h-full w-full"/> : <HiOutlineUserCircle />}
              </div>
              {showMenu && (
              <div className="absolute right-2 bg-white py-2 shadow drop-shodow-md cursor-pointer flex flex-col ">
                <Link to={"newproduct"} className="whitespace-nowrap">New Product</Link>
                {
                  userData.image ? <p className="cursor-pointer text-white px-2 bg-red-500"onClick={handleLogout}>Logout</p> : <Link to={"login"} className="whitespace-nowrap px-2">Login</Link>
                }
              </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
