"use client";
// import Header from "@/components/app/header";
import React from "react";
import Footer from "@/components/app/footer";
// import MiniHeader from "@/components/app/mini-header";
// import useBreakpoints from "@/utils/common";

export default function AppLayout({children}: Readonly<{ children: React.ReactNode }>) {
  // const [overlayClass, setOverlayClass] = useState<boolean>(false);
  // const {isXl} = useBreakpoints();
  return (
    // <div
    //   className={`${(overlayClass) ? `relative after:content-[""] after:absolute after:top-[64px] after:right-0 after:bg-[#0000002E] after:backdrop-blur-[4px] after:z-[1] after:w-[100vw] after:h-[100%]` : ``}`}>
    //   {isXl && <Header/>}
    //   {!isXl && <MiniHeader setClass={(item: boolean) => setOverlayClass(item)}/>}
    <div>
      <main className="bg-primary-500">
        {children}
      </main>
      <Footer/>
    </div>
  );
}
