import {useLocale, useTranslations} from "next-intl";
import Link from "next/link";

export default function Footer({}) {
  const t = useTranslations('footer');
  const locale = useLocale();
  const links = [
    {
      id: 0,
      title: t('terms'),
      src: `/${locale}/`
    },
    {
      id: 1,
      title: t('about_us'),
      src: `/${locale}/about-us`
    },
  ];

  return (
    <div className='bg-white border-t border-[#C5C5C5]'>
      <div className="container mx-auto pt-4 pb-6 md:px-10 px-4">
        <div className="justify-items-center">
          <ul className="flex justify-center mb-6">
            {links.map((item) => (
              <li key={item.id} className='mx-6'>
                <Link className="text-xs font-bold hover:text-primary-200"
                      href={item.src}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <div className='flex justify-center gap-12'>
            {/*<LinkedInIcon size='32'/>*/}
            {/*<TelegramIcon size='32'/>*/}
            {/*<InstagramIcon size='32'/>*/}
          </div>
        </div>

        <div className='mt-[128px] text-center text-xs font-bold'>
          کلیه حقوق این وب‌سایت محفوظ است © 2024 | بهره‌برداری و بازنشر مطالب تنها با ذکر منبع مجاز است.
        </div>
      </div>
    </div>
  );
};
