import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {ArrowBackIcon} from "@/assets/icons";
import Dropdown from "@/components/ui/drop-down";
import DatePicker from "@/components/ui/date-picker";

interface LoginFromProps {
  first_name: string;
  last_name: string;
  email: string;
  province: string;
  city: string;
  zip_code: string;
  gender: string;
  birth_date: string;
}

const initialData = {
  first_name: '',
  last_name: '',
  email: '',
  province: '',
  city: '',
  zip_code: '',
  gender: '',
  birth_date: '',
}

export default function RegisterForm() {
  const locale = useLocale();
  const t = useTranslations('auth.register');
  const [formData, setFormData] = useState<LoginFromProps>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: any) => {
    setErrors(prevState => {
      if (prevState[name]) {
        delete prevState[name];
      }
      return {
        ...prevState,
      }
    })
    setFormData({...formData, [name]: value});
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
    if (!formData.first_name) validationErrors.first_name = t('invalid_input', {key: t('first_name')});
    if (!formData.last_name) validationErrors.last_name = t('invalid_input', {key: t('last_name')});
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit} className="max-md:px-4 pt-[32.5px] pb-[125px] w-full md:w-[454px]">
      <Link href={`/${locale}/auth/login`} className='flex'>
        <ArrowBackIcon/>
        <span className='ms-3'>
          {t('back')}
        </span>
      </Link>

      <div className="text-center text-[32px] font-medium mb-3 mt-8">{t('title')}</div>
      <div className='text-center mb-8'>
        <span className="me-1">{t('subtitle')}</span>
        <Link className='underline' href={`/${locale}/auth/login`}>{t('sign_in')}</Link>
      </div>

      <div>
        <label htmlFor='first_name' className='text-gray-100'>
          {t('first_name')}
        </label>
        <input
          id="first_name"
          name="first_name"
          readOnly
          value={formData.first_name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.first_name ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="first_name-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.first_name}</div>
      </div>

      <div className='mt-6'>
        <label htmlFor='last_name' className='text-gray-100'>
          {t('last_name')}
        </label>
        <input
          id="last_name"
          name="last_name"
          value={formData.last_name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.last_name ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="last_name-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.last_name}</div>
      </div>

      <div className='mt-6'>
        <label htmlFor='email' className='text-gray-100'>
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type='email'
          value={formData.email}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.email ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="email-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.email}</div>
      </div>

      <div className='mt-6'>
        <Dropdown
          data={['Toronto', 'Vancouver', 'Québec']}
          label={t('province')}
          name='province'
          error={errors.province}
          onChange={(value) => handleChange('province', value)}
        />
      </div>

      <div className='mt-6'>
        <Dropdown
          data={['Toronto', 'Vancouver', 'Québec']}
          label={t('city')}
          name='city'
          error={errors.city}
          onChange={(value) => handleChange('city', value)}
        />
      </div>

      <div className='mt-6'>
        <label htmlFor='zip_code' className='text-gray-100'>
          {t('zip_code')}
        </label>
        <input
          id="zip_code"
          name="zip_code"
          value={formData.zip_code}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${errors.zip_code ? `border-red-500 text-red-500` : `border-gray-100`}`}
          aria-describedby="zip_code-error"
        />
        <div className="text-sm mt-2 text-red-500">{errors.zip_code}</div>
      </div>

      <div className='mt-6'>
        <Dropdown
          data={['Male', 'Female']}
          label={t('gender')}
          name='gender'
          error={errors.gender}
          onChange={(value) => handleChange('gender', value)}
        />
      </div>

      <div className='mt-6'>
        <DatePicker
          onChange={(value) => handleChange('birth_date', value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[32px] bg-primary-100 py-[18px] text-center text-lg text-white mt-6"
      >
        {t('create_account')}
      </button>
    </form>
  );
}
