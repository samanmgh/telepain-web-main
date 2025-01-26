"use client";
import {useTranslations} from "next-intl";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import React, {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {setCookie} from "cookies-next";

interface otpFormProps {
  mobile_number: string;
  otp: string;
}

export default function OtpForm({mobileNumber, time}: { mobileNumber: string, time: number }) {
  const t = useTranslations('login');
  const [formData, setFormData] = useState<otpFormProps>({mobile_number: '', otp: ''});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ttl, setTtl] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<any>(0);
  const searchParams = new URL(window.location.href).searchParams;
  useEffect(() => {
    time && handleTtl(time);
    if (!time && timer.current) {
      clearInterval(timer.current);
      setTtl(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
  useEffect(() => {
    mobileNumber && setFormData(prevState => {
      return {
        ...prevState,
        mobile_number: mobileNumber
      }
    });
  }, [mobileNumber]);
  const handleTtl = (time: number) => {
    timer.current = setInterval(() => {
      if (time > 0) {
        time -= 1;
        setTtl(time);
      } else {
        timer.current = 0;
        clearInterval(timer.current);
      }
    }, 1000);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(prevState => {
      if (prevState[event.target.name]) {
        delete prevState[event.target.name];
      }
      return {
        ...prevState,
      }
    })
    setFormData({...formData, [event.target.name]: event.target.value});
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault();
    if (handleErrors()) {
      // Auth.validateOtp({otp: formData.otp, mobile_number: formData.mobile_number}).then((response) => {
      //   if (response.meta.statusCode === 200) {
      //     localStorage.setItem('accessToken', response.data.accessToken);
      //     setCookie("accessToken", response.data.accessToken, {path: '/'});
      //     setFormData({mobile_number: '', otp: ''});
      //     setErrors({});
      //     window.location.replace(searchParams.get('redirect') ? searchParams.get('redirect')! : '/');
      //     toast.success(response.meta.displayMessage);
      //   }
      // })
      //   .finally(() => setLoading(false));
    }
  };
  const handleErrors = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.otp) validationErrors.otp = t('invalid_otp');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };
  const handleOtp = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    // Auth.createOtp({mobile_number: formData.mobile_number}).then((response) => {
    //   if (response.meta.statusCode === 200) {
    //     toast.success(response.meta.displayMessage);
    //     handleTtl(response.data.validOTPSeconds);
    //     setFormData({mobile_number: '', otp: ''});
    //     setErrors({});
    //   }
    // });
  };
  return (
    <form onSubmit={handleSubmit} className="xs:w-full w-[572px] bg-white px-8 py-6 rounded-xl">
      <div className="font-IransansBold text-md">{t('title')}</div>
      <div className="flex justify-center items-center mt-12">
        <Image
          src={logo}
          width={100}
          height={40}
          fill={false}
          alt='Iranesco'
        />
      </div>
      <div className="mt-12">
        <input
          id="otp"
          name="otp"
          placeholder={t('otp')}
          value={formData.otp}
          onChange={handleChange}
          type="tel"
          className={`w-full rounded-lg focus:ring-0 py-4 bg-white-300 sm:text-md sm:leading-6 ${errors.otp ? `border-1 border-red-500 text-red-500 placeholder:text-red-500` : `border-0 text-gray-100 placeholder:text-gray-100`}`}
          aria-describedby="name-error"
          dir="rtl"
        />
      </div>
      <div className="flex justify-between items-center mt-3 px-3">
        {(ttl && ttl > 0) && <div className="font-IransansBold text-sm">{ttl} {t('second')}</div>}
        <button className="font-IransansBold text-sm hover:text-primary-200 disabled:text-gray-100" disabled={ttl > 0}
                onClick={handleOtp}>{t('resend_otp')}</button>
      </div>
      <div className="mt-8 mb-5">
        <button
          type="submit"
          disabled={loading}
          className="block w-full rounded-lg bg-primary-100 py-2 text-center text-lg text-white hover:text-black font-IransansMedium h-[56px]"
        >
          {t('login')}
        </button>
      </div>
    </form>
  );
}
