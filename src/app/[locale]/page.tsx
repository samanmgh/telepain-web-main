"use client";
import AppLayout from "@/layouts/app-layout";
import Logo from "@/assets/images/logo.png";
import TeleImage from "@/assets/images/tele-image.png";
import Image from "next/image";
import {useLocale, useTranslations} from "next-intl";
import {CheckCircleIcon, PlusCircleIcon, ClockIcon} from "@/assets/icons";
import Link from "next/link";
import {useGetCookie} from 'cookies-next';



export default function Home() {
  const t = useTranslations('landing');
  const locale = useLocale();
  const getCookie = useGetCookie();
  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <div className={`flex ${getCookie('accessToken') ? 'justify-start' : 'justify-between'} items-center py-8`}>
          <Image src={Logo} alt={t("title")} width={55} height={50}/>
          {!getCookie('accessToken') && <Link href={`/${locale}/auth/login`}
                 className="flex justify-center items-center bg-gradient-to-r from-primary-300 to-primary-400 rounded-[100px] w-[155px] h-[55px] text-white text-[18px] !font-[600]">{t("login_button")}</Link>}
          {/*<button className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-[100px] w-[155px] h-[55px] text-white text-[18px] !font-[600]">{t("app_button")}</button>*/}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[68px]">
          <div className="col-span-1 flex flex-col items-start justify-center order-2 md:order-1">
            <div className="text-secondary-200 text-[22px] mb-2">{t("subtitle")}</div>
            <div className="text-[32px] md:text-[48px] !font-[700] mb-6">{t("display_name")}</div>
            <div className="!font-[400] text-gray-200 mb-6">{t("description1")}</div>
            <div className="!font-[400] text-gray-200 mb-6">{t("description2")}</div>
            <div className="!font-[400] text-gray-200 mb-6">{t("description3")}</div>
            {/*<button*/}
            {/*  className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-[100px] w-[155px] h-[55px] text-white text-[18px] !font-[600]">{t("app_button")}</button>*/}
          </div>
          <div className="col-span-1 order-1 md:order-2">
            <Image src={TeleImage} alt={t("title")} width={679} height={507}/>
          </div>
        </div>
        <div className="md:px-[60px] grid grid-cols-1 md:grid-cols-3 md:gap-7 pt-[50px] md:pt-[100px] pb-[50px] md:pb-[192px]">
          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <ClockIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">AI-Powered Symptom Checker</div>
              <div className="text-white text-[12px] !font-[400]">An AI tool that quickly assesses symptoms, offers recommendations, and suggests treatments, providing a helpful start before consultation</div>
            </div>
          </div>

          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <CheckCircleIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">Educational Resources</div>
              <div className="text-white text-[12px] !font-[400]">Access to educational materials, including video tutorials and exercises, to help you understand your condition and engage in your treatment</div>
            </div>
          </div>

          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <PlusCircleIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">Ongoing Support and Monitoring</div>
              <div className="text-white text-[12px] !font-[400]">Regular follow-ups, progress monitoring, and adaptable treatment plans tailored to your evolving needs</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
