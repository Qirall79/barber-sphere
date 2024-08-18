"use client";

import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./ui/UserDropDown";
import { chakraPetch } from "@/fonts";
import { MdAnalytics, MdHome, MdHomeFilled, MdNotifications } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";

export const Navbar = ({ user }: { user: IUser | undefined }) => {
  if (!user) return <></>;

  return (
    <nav className="w-full bg-slate-900 flex justify-center py-2 px-20">
      <div className="w-full max-w-[1250px] flex justify-between items-center">
        <Link className="" href={"/"}>
          <Image height={100} width={100} alt="logo" src={"/images/logo.png"} />
        </Link>
        <ul className={`flex space-x-20 ${chakraPetch.className}`}>
          <li>
            <Link href={"/"}><MdHomeFilled size={32} /></Link>
          </li>
          <li>
            <Link href={"/analytics"}>
              <MdAnalytics size={32} />
            </Link>
          </li>
          <li>
            <Link href={"/bookings"}>
              <Image height={28} width={28} alt="orders" src={"/images/orders.png"} />
            </Link>
          </li>
          <li>
            <Link href={"/services"}>
              <Image height={28} width={28} alt="orders" src={"/images/services.png"} />
            </Link>
          </li>
          <li>
            <Link href={"/"}>
            <MdNotifications size={32} />
            </Link>
          </li>
        </ul>
        <UserDropDown user={user} />
      </div>
    </nav>
  );
};
