"use client";
import LoginForm from "@/components/auth/login/login-form";
import {useState} from "react";
import OtpForm from "@/components/auth/login/otp-form";

export default function Page() {
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [ttl, setTtl] = useState<number>(0);
  return (
    <>
      {!mobileNumber && <LoginForm onNavigate={(elem: string) => setMobileNumber(elem)} setTtl={(elem: number) => setTtl(elem)}/>}
      {mobileNumber && <OtpForm mobileNumber={mobileNumber} time={ttl}/>}
    </>
  );
}
