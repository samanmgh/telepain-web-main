import AppLayout from "@/layouts/app-layout";
import Logo from "@/assets/images/logo.png";
import TeleImage from "@/assets/images/tele-image.png";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {CheckCircleIcon, PlusCircleIcon, ClockIcon} from "@/assets/icons";


export default function Home() {
  const t = useTranslations('landing');
  return (
    <AppLayout>
      <div className="container mx-auto px-4">
        <div className="flex justify-start items-center py-8">
          <Image src={Logo} alt={t("title")} width={55} height={50}/>
          {/*<button className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-[100px] w-[155px] h-[55px] text-white text-[18px] !font-[600]">{t("app_button")}</button>*/}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[68px]">
          <div className="col-span-1 flex flex-col items-start justify-center order-2 md:order-1">
            <div className="text-secondary-200 text-[22px] mb-2">{t("subtitle")}</div>
            <div className="text-[32px] md:text-[48px] !font-[700] mb-6">{t("display_name")}</div>
            <div className="!font-[400] text-gray-200 mb-6">{t("description")}</div>
            {/*<button*/}
            {/*  className="bg-gradient-to-r from-primary-300 to-primary-400 rounded-[100px] w-[155px] h-[55px] text-white text-[18px] !font-[600]">{t("app_button")}</button>*/}
          </div>
          <div className="col-span-1 order-1 md:order-2">
            <Image src={TeleImage} alt={t("title")} width={679} height={507}/>
          </div>
        </div>
        <div className="md:px-[140px] grid grid-cols-1 md:grid-cols-3 md:gap-7 pt-[50px] md:pt-[100px] pb-[50px] md:pb-[192px]">
          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <ClockIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">24 hour service</div>
              <div className="text-white text-[12px] !font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>

          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <CheckCircleIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">24 hour service</div>
              <div className="text-white text-[12px] !font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>

          <div
            className="col-span-1 bg-gradient-to-b from-primary-200 to-primary-600 flex justify-between items-center gap-3 px-4 py-2 rounded-xl my-2">
            <div>
              <PlusCircleIcon/>
            </div>
            <div>
              <div className="text-white text-[18px] !font-[600]">24 hour service</div>
              <div className="text-white text-[12px] !font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
