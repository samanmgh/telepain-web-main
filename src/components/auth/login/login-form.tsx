import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import EyeIcon from "@/assets/icons/eye-icon";

interface LoginFromProps {
  username: string;
  password: string;
}

export default function LoginForm() {
  const locale = useLocale();
  const t = useTranslations('auth.login');
  const [formData, setFormData] = useState<LoginFromProps>({username: '', password: ''});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault();
    if (handleErrors()) {
      // Auth.createOtp({mobile_number: formData.mobile_number}).then((response) => {
      //   if (response.meta.statusCode === 200) {
      //     toast.success(response.meta.displayMessage);
      //     setTtl(response.data.validOTPSeconds);
      //     onNavigate(formData.mobile_number);
      //     setFormData({mobile_number: ''});
      //     setErrors({});
      //   }
      // })
      //   .finally(() => setLoading(false));
    }
  };

  const handleErrors = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.username) validationErrors.username = t('invalid_username');
    if (!formData.password) validationErrors.password = t('invalid_password');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="max-md:px-4 pt-[154px] w-full md:w-[454px]">
      <div className="text-center text-[32px] font-medium mb-3">{t('title')}</div>
      <div className='text-center mb-8'>
        <span className="me-1">{t('subtitle')}</span>
        <Link className='underline' href={`/${locale}/auth/register`}>{t('sign_up')}</Link>
      </div>

      <div>
        <label htmlFor='username' className='text-gray-100'>
          {t('email_or_username')}
        </label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.username ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="username-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.username}</div>
      </div>

      <div className='mt-6 mb-2'>
        <label htmlFor='password' className='text-gray-100 flex justify-between'>
          {t('password')}
          <button>
            <EyeIcon/>
          </button>
        </label>
        <input
          id="password"
          name="password"
          type='password'
          value={formData.password}
          onChange={handleChange}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.password ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="password-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.password}</div>
      </div>

      <Link className='block underline text-right'
            href={`/${locale}/auth/forgot-password`}>{t('forgot_password')}</Link>

      <div className="flex items-center gap-x-3 mt-2">
        <input
          id="remember_me"
          type="checkbox"
          className="h-[18px] w-[18px] rounded border-gray-100 focus:ring-0 checked:bg-black checked:hover:bg-black checked:focus:bg-black focus:outline-none"
        />
        <label htmlFor="remember_me">
          {t('remember_me')}
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[32px] bg-primary-100 py-[18px] text-center text-lg text-white mt-6"
      >
        {t('title')}
      </button>
    </form>
  );
}
