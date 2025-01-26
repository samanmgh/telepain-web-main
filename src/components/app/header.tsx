import Image from "next/image";
import Link from "next/link";
import {useLocale} from "next-intl";
// import {useRouter} from "next/navigation";
import logo from '@/assets/images/logo.png'
import {PlanetIcon} from "@/assets/icons";

export default function Header() {
  // const t = useTranslations('header');
  // const router = useRouter();
  const locale = useLocale();
  // const [accessToken, setAccessToken] = useState<string | null>(null);
  // useEffect(() => {
  //   window && window.localStorage.getItem('accessToken') && setAccessToken(window.localStorage.getItem('accessToken'));
  // }, []);

  return (
    <header className="fixed top-0 right-0 w-full h-[98px] z-20 shadow-custom-header bg-white">
      <div className="px-[56px] h-full">
        <div className="flex justify-between h-full items-center">
          <Link href='/'>
            <Image
              src={logo}
              width={55}
              height={50}
              fill={false}
              alt='Iranesco'
            />
          </Link>

          <button
            className="bg-transparent text-base font-medium text-black flex items-center"
          >
            <PlanetIcon/>
            <div className='ms-1'>
              {locale.toUpperCase()}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
