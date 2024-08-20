"use client";

import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./ui/UserDropDown";
import { chakraPetch } from "@/fonts";
import {
  MdAnalytics,
  MdHome,
  MdHomeFilled,
  MdNotifications,
  MdOutlineMenu,
} from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";

export const Navbar = ({ user }: { user: IUser | undefined }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  if (!user) return <></>;

  return (
    <nav
      className={`bg-slate-950 text-slate-100 h-screen w-[300px]  py-4 relative ${
        menuOpen ? "px-4" : "-translate-x-full w-0 static px-0"
      } transition-all`}
    >
      <div
        className={`max-h-screen h-full w-full max-w-[1250px] flex flex-col justify-start items-start ${
          menuOpen ? "" : "hidden"
        }`}
      >
        <MdOutlineMenu
          className="lg:hidden cursor-pointer"
          size={36}
          onClick={() => setMenuOpen(true)}
        />
        <Link className="mb-12" href={"/"}>
          <Image height={200} width={200} alt="logo" src={"/images/logo.png"} />
        </Link>
        <ul
          className={`hidden w-full lg:flex flex-col flex-grow space-y-6 ${chakraPetch.className}`}
        >
          <li>
            <Link
              className="flex items-center space-x-4 hover:bg-slate-800 px-2 py-1 rounded-md transition-all"
              href={"/"}
            >
              <MdHomeFilled size={32} />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-4 hover:bg-slate-800 px-2 py-1 rounded-md transition-all"
              href={"/analytics"}
            >
              <MdAnalytics size={32} />
              <p>Analytics</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-4 hover:bg-slate-800 px-2 py-1 rounded-md transition-all"
              href={"/bookings"}
            >
              <Image
                height={32}
                width={32}
                alt="orders"
                src={"/images/orders.png"}
              />
              <p>Orders</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-4 hover:bg-slate-800 px-2 py-1 rounded-md transition-all"
              href={"/services"}
            >
              <Image
                height={32}
                width={32}
                alt="orders"
                src={"/images/services.png"}
              />
              <p>Services</p>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-4 hover:bg-slate-800 px-2 py-1 rounded-md transition-all"
              href={"/"}
            >
              <MdNotifications size={32} />
              <p>Notifications</p>
            </Link>
          </li>
        </ul>
        <UserDropDown user={user} />
      </div>
      <div
        onClick={() => setMenuOpen(false)}
        className="flex justify-center items-center cursor-pointer absolute top-0 right-0 w-10 h-10 text-slate-950 bg-slate-100 rounded-l-2xl"
      >
        <IoIosArrowBack size={32} />
      </div>

      <div
        onClick={() => setMenuOpen(true)}
        className={`flex justify-center items-center cursor-pointer absolute top-0 -right-10 w-12 h-10 text-slate-100 bg-slate-950 rounded-r-2xl ${
          menuOpen ? "hidden" : ""
        }`}
      >
        <HiMenuAlt1 size={32} />
      </div>
    </nav>
  );
};
