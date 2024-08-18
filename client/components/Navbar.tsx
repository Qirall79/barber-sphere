"use client";

import Image from "next/image";
import Link from "next/link";
import UserDropDown from "./ui/UserDropDown";
import { chakraPetch } from "@/fonts";

export const Navbar = ({ user }: { user: IUser | undefined }) => {
  if (!user) return <></>;

  return (
    <nav className="w-full bg-slate-950 flex justify-center py-2 px-20">
      <div className="w-full max-w-[1250px] flex justify-between items-center">
        <Link className="" href={"/"}>
          <Image height={100} width={100} alt="logo" src={"/images/logo.png"} />
        </Link>
        <ul className={`flex space-x-20 ${chakraPetch.className}`}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/analytics"}>Analytics</Link>
          </li>
          <li>
            <Link href={"/bookings"}>Bookings</Link>
          </li>
        </ul>
        <UserDropDown user={user} />
      </div>
    </nav>
  );
};
