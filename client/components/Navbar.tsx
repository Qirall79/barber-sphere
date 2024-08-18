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
import { Tooltip } from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export const Navbar = ({ user }: { user: IUser | undefined }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return <></>;

  return (
    <nav className="w-full bg-slate-900 flex justify-center py-2 px-10 lg:px-20">
      <div className="w-full max-w-[1250px] flex justify-between items-center">
        <MdOutlineMenu
          className="lg:hidden cursor-pointer"
          size={36}
          onClick={() => setMenuOpen(true)}
        />

        <Link className="" href={"/"}>
          <Image height={100} width={100} alt="logo" src={"/images/logo.png"} />
        </Link>
        <ul className={`hidden lg:flex space-x-20 ${chakraPetch.className}`}>
          <li>
            <Link href={"/"}>
              <MdHomeFilled size={32} />
            </Link>
          </li>
          <li>
            <Link href={"/analytics"}>
              <MdAnalytics size={32} />
            </Link>
          </li>
          <li>
            <Link href={"/bookings"}>
              <Image
                height={28}
                width={28}
                alt="orders"
                src={"/images/orders.png"}
              />
            </Link>
          </li>
          <li>
            <Link href={"/services"}>
              <Image
                height={28}
                width={28}
                alt="orders"
                src={"/images/services.png"}
              />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <MdNotifications size={32} />
            </Link>
          </li>
        </ul>

        <div
          className={`w-full h-full justify-center items-center md:w-[450px] md:h-[600px] bg-slate-950 z-50 flex lg:hidden absolute top-0 ${
            menuOpen ? "left-0" : "-left-[100%]"
          } transition-all`}
        >
          <IoMdClose
            onClick={() => setMenuOpen(false)}
            className="absolute top-10 left-10 cursor-pointer"
            color="pink"
            size={36}
          />
          <ul
            className={`h-full flex flex-col justify-center space-y-10 ${chakraPetch.className}`}
          >
            <li>
              <Link className="flex items-center space-x-4" href={"/"}>
                <MdHomeFilled size={44} />
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-4" href={"/analytics"}>
                <MdAnalytics size={44} />
                <p>Analytics</p>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-4" href={"/bookings"}>
                <Image
                  height={40}
                  width={40}
                  alt="orders"
                  src={"/images/orders.png"}
                />
                <p>Bookings</p>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-4" href={"/services"}>
                <Image
                  height={40}
                  width={40}
                  alt="orders"
                  src={"/images/services.png"}
                />
                <p>Services</p>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-4" href={"/"}>
                <MdNotifications size={44} />
                <p>Notifications</p>
              </Link>
            </li>
          </ul>
        </div>
        <UserDropDown user={user} />
      </div>
    </nav>
  );
};
