import {useLocale, useTranslations} from "next-intl";
import React, {useState} from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import {ArrowBackIcon} from "@/assets/icons";
import z from "zod";
import {zfd} from "zod-form-data";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import EyeIcon from "@/assets/icons/eye-icon";
import {authApi} from "@/services/api/auth";
import {useRouter, useSearchParams} from "next/navigation";


export const UPPERCASE_REGEX = /[A-Z]/;
export const LOWERCASE_REGEX = /[a-z]/;
export const NUM_AND_SYM_REGEX = /[!@#$%^&*(),.?":{}|<>]/;
export const NUMBER_REGEX = /[0-9]/;

export const resetPasswordSchema = () => zfd.formData({
  newPassword: zfd.text(
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
}).superRefine((data, ctx) => {
  if (data.newPassword !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords mismatch.",
      fatal: true,
    });
  }
});

export type resetPasswordCredentials = z.infer<ReturnType<typeof resetPasswordSchema>>;

export default function ResetPasswordForm() {
  const locale = useLocale();
  const t = useTranslations('auth.reset_password');
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<resetPasswordCredentials>({
    resolver: zodResolver(resetPasswordSchema()),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });
  const [loading, setLoading] = useState(false);
  const [passType, setPassType] = useState<boolean>(false);
  const [newPassType, setNewPassType] = useState<boolean>(false);

  const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setPassType(!passType);
  };

  const handleNewShowPassword = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setNewPassType(!newPassType);
  };

  const handleSubmit = async (data: resetPasswordCredentials) => {
    if (loading) return;
    if (searchParams.get('token')) {
      setLoading(true);
      try {
        const res = await authApi.resetPassword({
          ...data,
          token: searchParams.get('token') as string
        }).fetch();
        toast.success(res.meta.displayMessage);
        router.push(`/${locale}/auth/login`);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form autoComplete="off" onSubmit={form.handleSubmit(handleSubmit)}
          className="max-md:px-4 pt-[80px] pb-[125px] w-full md:w-[454px]">
      <Link href={`/${locale}/auth/forget-password`} className='flex'>
        <ArrowBackIcon/>
        <span className='ms-3'>
          {t('back')}
        </span>
      </Link>

      <div className="text-center text-2xl font-medium my-8">{t('title')}</div>

      <Controller
        control={form.control}
        name="newPassword"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='newPassword' className='text-gray-100 flex justify-between'>
              {t('new_password')}
              <button onClick={handleShowPassword}>
                <EyeIcon/>
              </button>
            </label>
            <input
              id="newPassword"
              value={field.value}
              type={passType ? "text" : "password"}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.newPassword?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="new_password-error"
            />
            {form.formState.errors.newPassword?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.newPassword?.message}</div>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="confirmPassword"
        render={({field}) => (
          <div className='mt-6'>
            <label htmlFor='confirmPassword' className='text-gray-100 flex justify-between'>
              {t('confirm_password')}
              <button onClick={handleNewShowPassword}>
                <EyeIcon/>
              </button>
            </label>
            <input
              id="confirmPassword"
              value={field.value}
              type={newPassType ? "text" : "password"}
              onChange={field.onChange}
              className={`w-full h-[56px] mt-3 rounded-xl border-gray-100 focus:ring-0 ${form.formState.errors.confirmPassword?.message ? `border-red-500 text-red-500` : `border-gray-100`}`}
              aria-describedby="last_name-error"
            />
            {form.formState.errors.confirmPassword?.message &&
              <div className="text-sm mt-2 text-red-500">{form.formState.errors.confirmPassword?.message}</div>}
          </div>
        )}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-[32px] bg-primary-100 py-[18px] text-center text-lg text-white mt-6"
      >
        {t('submit')}
      </button>
    </form>
  );
}
