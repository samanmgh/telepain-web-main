"use client";
import React from "react";
import {useTranslations} from "next-intl";

export default function ConfirmEmailPage() {
  const t = useTranslations('auth.confirm_email');
  return (
    <div className="max-md:px-4 pt-[74px] w-full md:w-[454px]">
      <div className="text-center text-[32px] font-medium mb-3">{t('title')}</div>
      <div className='text-center mb-8'>
        <span className="me-1">{t('subtitle')}</span>
      </div>
    </div>);
}
