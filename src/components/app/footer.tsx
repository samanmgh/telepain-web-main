import {useTranslations} from "next-intl";
import Image from "next/image";
import WhiteLogo from "@/assets/images/white-logo.png";
import Link from "next/link";
import {LinkedInIcon} from "@/assets/icons/index";

export default function Footer({}) {
  const t = useTranslations('footer');

  return (
    <div className='bg-primary-200'>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 py-8">
            <Image src={WhiteLogo} alt={t("title")} width={56} height={25}/>
            <div className="text-white !font-[300] italic mt-4 mb-2">{t("description")}</div>
            <Link href="https://www.linkedin.com/company/telepain">
              <LinkedInIcon/>
            </Link>
          </div>
          <div className="col-span-1 flex justify-start md:justify-end py-8">
            <div>
              <div className="text-white text-[20px] !font-[600]">{t("contact")}</div>
              <div className="text-white !font-[400] mt-6">+1 (604) 399 4002</div>
              <div className="text-white !font-[400] mt-4">info@telepainsolutions.ca</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
