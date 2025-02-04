import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {zfd} from "zod-form-data";
import z from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {authApi} from "@/services/api/auth";
import {useRouter} from "next/navigation";
import {ArrowBackIcon} from "@/assets/icons";

export const forgetSchema = () => zfd.formData({
  email: zfd.text(
    z.string({required_error: "This field is required."})
      .min(1, "This field is required.")
      .email({message: "This email is not correct."})
      .default("")
  ),
});

export type forgetCredentials = z.infer<ReturnType<typeof forgetSchema>>;

export default function ForgetForm() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('auth.forget_password');
  const form = useForm<forgetCredentials>({
    resolver: zodResolver(forgetSchema()),
    defaultValues: {
      email: "",
    },
    mode: "all",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: forgetCredentials) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await authApi.forgotPassword({...data}).fetch();
      toast.success(res.meta.displayMessage);
      router.push(`/${locale}/auth/confirm-email`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}
          className="max-md:px-4 pt-[74px] w-full md:w-[454px]">
      <Link href={`/${locale}/auth/login`} className='flex'>
        <ArrowBackIcon/>
        <span className='ms-3'>
          {t('back')}
        </span>
      </Link>

      <div className="text-center text-2xl font-medium my-8">{t('title')}</div>

      <Controller
        control={form.control}
        name="email"
        render={({field}) => (
          <div>
            <label htmlFor='email' className='text-gray-100'>
              {t('email')}
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

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[32px] bg-primary-100 py-[18px] text-center text-lg text-white mt-6"
      >
        {t('continue')}
      </button>
    </form>
  );
}
