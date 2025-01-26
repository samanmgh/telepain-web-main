"use client";
import Header from "@/components/app/header";
import React, {useState} from "react";
import MiniHeader from "@/components/app/mini-header";
import useBreakpoints from "@/utils/common";

export default function AuthLayout({children}: Readonly<{ children: React.ReactNode }>) {
  const [overlayClass, setOverlayClass] = useState<boolean>(false);
  const {isLg} = useBreakpoints();

  return (
    <div
      className={`${(overlayClass) ? `relative after:content-[""] after:absolute after:top-[64px] after:right-0 after:bg-[#0000002E] after:backdrop-blur-[4px] after:z-[1] after:w-[100vw] after:h-[100%]` : ``}`}>
      {isLg && <Header/>}
      {!isLg && <MiniHeader setClass={(item: boolean) => setOverlayClass(item)}/>}
      <main className="pt-[98px] pb-4 min-h-[100vh] max-w-[100vw] flex justify-center bg-auth-pattern bg-no-repeat bg-[left_bottom_6rem]">
        {children}
      </main>
    </div>
  );
}
