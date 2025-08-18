"use client";
import Link from "next/link";
import Avatar from "@/ui/Avatar";
import ButtonIcon from "@/ui/ButtonIcon";
import { useAuth } from "context/AuthContext";
import Drawer from "./drawer";
import SideBar from "./SideBar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function Header() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { user, isLoading } = useAuth();
  return (
    
    <header
      className={`bg-secondary-0 ${isLoading ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <ButtonIcon
          className={`block lg:hidden border-none`}
          variant={"  outline"}
          onClick={()=>setIsOpenDrawer(true)}
        >
          {isOpenDrawer ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon />}
        </ButtonIcon>
        <div className="flex items-center gap-x-3">
          <div className="flex flex-col lg:flex-row justify-start lg:items-center gap-x-2">
            <span className="text-sm lg:text-lg font-bold text-secondary-700">
              سلام؛ {user?.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <Link href="/profile">
            <ButtonIcon
              color="outline"
              className={`border-secondaray-200 rounded-2xl flex cursor-pointer items-center`}
            >
              <Avatar src={user?.avatarUrl} />

            </ButtonIcon>
          </Link>
          <Drawer open={isOpenDrawer} onclose={() => setIsOpenDrawer(false)}>
            <SideBar onclose={() => setIsOpenDrawer(false)} />
          </Drawer>
          
        </div>
      </div>
    </header>
  );
}
export default Header;
