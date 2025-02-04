import {useLocale, useTranslations} from "next-intl";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {ArrowBackIcon} from "@/assets/icons";
import Dropdown from "@/components/ui/drop-down";
import DatePicker from "@/components/ui/date-picker";
import z from "zod";
import {zfd} from "zod-form-data";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRequest} from "@/services/api/use-request";
import {cityApi} from "@/services/api/city";
import {CityDetail} from "@/types";
import EyeIcon from "@/assets/icons/eye-icon";
import {authApi} from "@/services/api/auth";
import {useRouter} from "next/navigation";


export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWERCASE_REGEX = /[a-z]/;
export const NUM_AND_SYM_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const NUMBER_REGEX = /[0-9]/;

export const registerSchema = () => zfd.formData({
  userName: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  firstName: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  lastName: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  email: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .email({message: "This email is not correct."})
      .default("")
  ),
  phoneNumber: zfd.text(
    z.string({required_error: "This field is required."})
      .min(8, "This field is required.")
      .default("")
  ),
  password: zfd.text(
    z
      .string({required_error: "This field is required."})
      .min(8, "Use 8 or more characters.")
      .refine((value) => UPPERCASE_REGEX.test(value), "Use upper and lower case letters (e.g. Aa).")
      .refine((value) => LOWERCASE_REGEX.test(value), "Use upper and lower case letters (e.g. Aa).")
      .refine((value) => NUM_AND_SYM_REGEX.test(value), "Use a symbol (e.g. !@#$).")
      .refine((value) => NUMBER_REGEX.test(value), "Use a number (e.g. 1234).")
      .default("")
  ),
  confirmPassword: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  provinceId: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  cityId: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  zipCode: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  gender: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
  dateOfBirth: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords mismatch.",
      fatal: true,
    });
  }
});

export type registerCredentials = z.infer<ReturnType<typeof registerSchema>>;

export default function RegisterForm() {
  const locale = useLocale();
  const t = useTranslations('auth.register');
  const router = useRouter();
  const genderData = [
    {id: 0, name: "Male"},
    {id: 1, name: "Female"},
    {id: 2, name: "Not prefer to say"},
  ];
  const form = useForm<registerCredentials>({
    resolver: zodResolver(registerSchema()),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      provinceId: "",
      cityId: "",
      zipCode: "",
      gender: "",
      dateOfBirth: ""
    },
    mode: "all",
  });
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState<CityDetail[]>([]);
  const [passType, setPassType] = useState<boolean>(false);
  const {data: provinces} = useRequest(cityApi.provinces());
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    form.watch('provinceId') && getCitiesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('provinceId')]);

  const getCitiesData = async () => {
    try {
      const city = await cityApi.cities({provinceId: Number(form.watch('provinceId'))}).fetch();
      if(city.data) setCityData(city.data as any);
    } catch (e) {
      console.log(e)
    }
  };

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setPassType(!passType);
  };

  const handleSubmit = async (data: registerCredentials) => {
    if(loading) return;
    setLoading(true);
    try {
      const res = await authApi.register({
        ...data,
        provinceId: Number(data.provinceId),
        cityId: Number(data.cityId),
        gender: Number(data.gender),
        dateOfBirth: new Date(data.dateOfBirth).toISOString()
      }).fetch();
      toast.success(res.meta.displayMessage);
      router.push(`/${locale}/auth/confirm-email`);
    } catch (e){
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}
          className="max-md:px-4 pt-[32.5px] pb-[125px] w-full md:w-[454px]">
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

      <Controller
        control={form.control}
        name="userName"
        render={({field}) => (
          <div>
            <label htmlFor='userName' className='text-gray-100'>
              {t('user_name')}
            </label>
            <input
              id="userName"
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.userName?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="first_name-error"
            />
            {form.formState.errors.userName?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.userName?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="firstName"
        render={({field}) => (
          <div className="mt-6">
            <label htmlFor='firstName' className='text-gray-100'>
              {t('first_name')}
            </label>
            <input
              id="firstName"
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form?.formState?.errors?.firstName?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="first_name-error"
            />
            {form?.formState?.errors?.firstName?.message &&
              <div className="text-sm mt-2 text-red-500">{form?.formState?.errors?.firstName?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="lastName"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='lastName' className='text-gray-100'>
              {t('last_name')}
            </label>
            <input
              id="lastName"
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.lastName?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="last_name-error"
            />
            {form.formState.errors.lastName?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.lastName?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="email"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='email' className='text-gray-100'>
              {t('email')}
            </label>
            <input
              id="email"
              type='email'
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.email?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="email-error"
            />
            {form.formState.errors.email?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.email?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="phoneNumber"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='phoneNumber' className='text-gray-100'>
              {t('phone_number')}
            </label>
            <input
              id="phoneNumber"
              value={field.value}
              placeholder={'+12505550199'}
              type="tel"
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.phoneNumber?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="last_name-error"
            />
            {form.formState.errors.phoneNumber?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.phoneNumber?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='password' className='text-gray-100 flex justify-between'>
              {t('password')}
              <button onClick={handleShowPassword}>
                <EyeIcon/>
              </button>
            </label>
            <input
              id="password"
              value={field.value}
              type={passType ? "text" : "password"}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.password?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="last_name-error"
            />
            {form.formState.errors.password?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.password?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="confirmPassword"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='password' className='text-gray-100 flex justify-between'>
              {t('confirm_password')}
              <button onClick={handleShowPassword}>
                <EyeIcon/>
              </button>
            </label>
            <input
              id="confirmPassword"
              value={field.value}
              type="password"
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.confirmPassword?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="last_name-error"
            />
            {form.formState.errors.confirmPassword?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.confirmPassword?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="provinceId"
        render={({field}) => (
          <div className='mt-6'>
            <Dropdown
              data={provinces?.data as any}
              label={t('province')}
              error={form.formState.errors.provinceId?.message}
              {...field}
            />
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="cityId"
        render={({field}) => (
          <div className='mt-6'>
            <Dropdown
              data={cityData}
              label={t('city')}
              error={form.formState.errors.cityId?.message}
              {...field}
            />
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="zipCode"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='zip_code' className='text-gray-100'>
              {t('zip_code')}
            </label>
            <input
              id="zip_code"
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.zipCode?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="zip_code-error"
            />
            {form.formState.errors.zipCode?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.zipCode?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="gender"
        render={({field}) => (
          <div className='mt-6'>
            <Dropdown
              data={genderData}
              label={t('gender')}
              error={form.formState.errors.gender?.message}
              {...field}
            />
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="dateOfBirth"
        render={({field}) => (
          <div className='mt-6'>
            <DatePicker
              label={t('birth_date')}
              error={form.formState.errors.dateOfBirth?.message}
              {...field}
            />
          </div>
        )}
      />

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
