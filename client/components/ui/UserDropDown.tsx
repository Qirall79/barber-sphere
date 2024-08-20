import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { SignOut } from "../SignOut";
import { CiMenuKebab } from "react-icons/ci";

export default function UserDropDown({ user }: { user: IUser }) {
  return (
    <div className="w-full hover:bg-slate-800 px-2 py-1 rounded-md transition-all cursor-pointer">
      <Dropdown className="bg-slate-900" placement="bottom-end">
        <DropdownTrigger>
          <div className="flex items-center justify-between ">
            <User
              name={user.name}
              description={user.type}
              avatarProps={{
                src: "https://api.dicebear.com/7.x/lorelei/svg",
              }}
            />
            <CiMenuKebab size={20} />
          </div>
        </DropdownTrigger>
        <DropdownMenu className="text-slate-100" aria-label="Profile Actions" variant="flat">
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="logout" color="danger">
            <SignOut />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
