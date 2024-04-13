import { List, ListItemButton, ListSubheader, Popover } from "@mui/material";
import { Fragment, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

export default function Header() {
  const { isLoggedIn, account, logout } = useAuth();

  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);


  return (<></>
    // <div className="flex items-center mx-auto h-20  justify-between container px-10 bg-black text-white">
    //   <h1 className="text-3xl font-bold ">{account?.username || "Guest"}</h1>
    //   <div onClick={togglePopover} className="bg-white flex items-center justify-center relative h-12 aspect-square rounded-full">
    //     <h3 className="text-2xl  text-black font-bold capitalize">{account?.username[0] || "g"}</h3>
    //     {popover && <ul className="absolute top-14 right-0 w-40 space-y-2 bg-white text-black shadow-xl p-2 rounded-xl">
    //        <li className="cursor-pointer border-b" > Hello, {isLoggedIn ? account.username : "Guest"}</li>
    //        {isLoggedIn ? (
    //          <li onClick={logout}>Logout</li>
    //        ) : (
    //          <>
    //            <li className="cursor-pointer" onClick={clickLogin}>Login</li>
    //            <li className="cursor-pointer" onClick={clickRegister}>Reigster</li>
    //          </>
    //        )}
    //      </ul>}
    //   </div>
    //   <AuthModal
    //     open={authModal}
    //     close={() => setAuthModal(false)}
    //     isRegisterMode={register}
    //     toggleRegister={() => setRegister((prev) => !prev)}
    //   />
    // </div>
  );
}
