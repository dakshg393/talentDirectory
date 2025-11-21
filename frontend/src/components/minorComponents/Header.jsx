import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";
import { IoMdMoon } from "react-icons/io";
import { IoAdd, IoPulse, IoSunny } from "react-icons/io5";
import Button from "./Button";
import AddTalent from "../majorComponents/Talent/AddTalent";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
 const [addTalent,setAddTalent] = useState(false)
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // localStorage.setItem("theme", theme);
  }, [theme]); // dependency = state change

  return (
    <div className="w-full h-[60px] border-b-1 border-border-color flex justify-between items-center flex-row px-[20px] bg-surface dark:bg-surface-dark">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent text-2xl font-bold">Talent X</div>
      <div className="flex flex-row gap-[20px] items-center">
        <div
          onClick={() => dispatch(toggleTheme())}
          className=" rounded-full w-9 h-9  flex items-center justify-center border-1 border-border-color cursor-pointer"
        >
          {theme === "dark" ? (
            <IoSunny className="text-amber-200" />
          ) : (
            <IoMdMoon className="text-primary" />
          )}
        </div>
        <Button onClick={()=>setAddTalent(true)} icon={IoAdd}>Add Talent</Button>
      </div>
       {addTalent && <AddTalent onClose={()=>setAddTalent(false)}/>}
    </div>

     
  );
};

export default Header;
