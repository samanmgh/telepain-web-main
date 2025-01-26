import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import {CloseIcon, MenuIcon} from "@/assets/icons";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function MiniHeader({setClass}: { setClass: (item: boolean) => void }) {
  const t = useTranslations('header');
  const router = useRouter();
  const locale = useLocale();
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // useEffect(() => {
  //   window && window.localStorage.getItem('accessToken') && setAccessToken(window.localStorage.getItem('accessToken'));
  // }, []);
  const links = [
    {
      id: 0,
      title: t('home'),
      src: `/${locale}/`
    },
  ];
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const handleDrawer = (status: boolean) => {
    setOpenDrawer(status);
    setClass(status);
  };
  return (
    <header className="fixed top-0 right-0 w-full bg-white h-[84px] z-20 shadow">
      <div className="container mx-auto h-full p-4">
        <div className="flex justify-between items-center h-full">
          <Link href='/'>
            <h1 className='font-bold text-2xl'>
              {t('branding')}
            </h1>
          </Link>
          {/*<Image*/}
          {/*  src={logo}*/}
          {/*  width={90}*/}
          {/*  fill={false}*/}
          {/*  alt='Iranesco'*/}
          {/*/>*/}
          <button onClick={() => handleDrawer(!openDrawer)}>
            {openDrawer ? <CloseIcon/> : <MenuIcon/>}
          </button>
        </div>
      </div>
      <div className={openDrawer ? 'menu-animate' : 'hidden-menu-animate'}>
        {openDrawer && <div className="container mx-auto p-4">
          <ul>
            {links.map((item) => (
              <li key={item.id} className="mt-4 first:mt-0">
                <Link className="font-IransansBold text-md text-black hover:text-primary-200"
                      href={item.src}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="h-full mt-4">
            <button
              className="rounded-lg bg-primary-100 px-6 py-2 font-IransansMedium text-sm w-full text-white hover:text-black mb-4"
              onClick={() => router.push(`/${locale}/login`)}>{t('login')}/{t('sign_up')}</button>
            <button
              className="rounded-lg bg-primary-100 px-6 py-2 font-IransansMedium text-sm w-full text-white hover:text-black"
              onClick={() => router.push(`/${locale}/panel/tickets`)}
            >
              {t('submit_order')}
            </button>
          </div>
        </div>}
      </div>
    </header>
  );
}
