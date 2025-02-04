import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import EyeIcon from "@/assets/icons/eye-icon";
import {zfd} from "zod-form-data";
import z from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {authApi} from "@/services/api/auth";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

export const loginSchema = () => zfd.formData({
  email: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .email({message: "This email is not correct."})
      .default("")
  ),
  password: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .default("")
  ),
});

export type loginCredentials = z.infer<ReturnType<typeof loginSchema>>;

export default function LoginForm() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('auth.login');
  const [passType, setPassType] = useState<boolean>(false);
  const form = useForm<loginCredentials>({
    resolver: zodResolver(loginSchema()),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });
  const [loading, setLoading] = useState(false);

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setPassType(!passType);
  };

  const handleSubmit = async (data: loginCredentials) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await authApi.login({...data}).fetch();
      localStorage.setItem('accessToken', res.data.token);
      setCookie("accessToken", res.data.token, {path: '/'});
      toast.success(res.meta.displayMessage);
      router.push('/');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}
          className="max-md:px-4 pt-[154px] w-full md:w-[454px]">
      <div className="text-center text-[32px] font-medium mb-3">{t('title')}</div>
      <div className='text-center mb-8'>
        <span className="me-1">{t('subtitle')}</span>
        <Link className='underline' href={`/${locale}/auth/register`}>{t('sign_up')}</Link>
      </div>

      <Controller
        control={form.control}
        name="email"
        render={({field}) => (
          <div>
            <label htmlFor='email' className='text-gray-100'>
              {t('email_or_username')}
            </label>
            <input
              id="email"
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.email?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
            />
            {form.formState.errors.email?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.email?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({field}) => (
          <div className='mt-6 mb-2'>
            <label htmlFor='password' className='text-gray-100 flex justify-between'>
              {t('password')}
              <button onClick={handleShowPassword}>
                <EyeIcon/>
              </button>
            </label>
            <input
              id="password"
              type={passType ? "text" : "password"}
              value={field.value}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.password?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="password-error"
            />
            {form.formState.errors.password?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.password?.message}</div>}
          </div>
        )}
      />

      <Link className='block underline text-right'
            href={`/${locale}/auth/forget-password`}>{t('forgot_password')}</Link>

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
