/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface City {
  /** @format int64 */
  id?: number;
  createdBy?: string | null;
  /** @format date-time */
  createdDate?: string;
  lastModifiedBy?: string | null;
  /** @format date-time */
  lastModifiedDate?: string | null;
  isDeleted?: boolean;
  /** @format date-time */
  deletedDate?: string | null;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** @format int64 */
  provinceId: number;
  province?: Province;
}

export interface ForgotPasswordDto {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
}

/** @format int32 */
export enum Gender {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
}

export interface LoginDto {
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @minLength 1 */
  password: string;
}

export interface Province {
  /** @format int64 */
  id?: number;
  createdBy?: string | null;
  /** @format date-time */
  createdDate?: string;
  lastModifiedBy?: string | null;
  /** @format date-time */
  lastModifiedDate?: string | null;
  isDeleted?: boolean;
  /** @format date-time */
  deletedDate?: string | null;
  /**
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  cities?: City[] | null;
}

export interface RegisterDto {
  /**
   * @minLength 0
   * @maxLength 256
   */
  userName: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  firstName: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  lastName: string;
  /**
   * @format email
   * @minLength 1
   */
  email: string;
  /** @format tel */
  phoneNumber?: string | null;
  /** @minLength 6 */
  password: string;
  /** @minLength 1 */
  confirmPassword: string;
  /** @format int64 */
  provinceId: number;
  /** @format int64 */
  cityId: number;
  zipCode?: string | null;
  gender: Gender;
  /** @format date-time */
  dateOfBirth: string;
}

export interface ResetPasswordDto {
  /**
   * @format email
   * @minLength 1
   */
  /** @minLength 1 */
  token: string;
  /**
   * @minLength 6
   * @maxLength 100
   */
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id?: string | null;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  /** @format date-time */
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  /** @format int32 */
  accessFailedCount?: number;
  /**
   * @minLength 1
   * @maxLength 50
   */
  firstName: string;
  /**
   * @minLength 1
   * @maxLength 50
   */
  lastName: string;
  /** @format int64 */
  provinceId: number;
  /** @format int64 */
  cityId: number;
  /** @maxLength 20 */
  zipCode?: string | null;
  gender: Gender;
  /** @format date-time */
  dateOfBirth: string;
  province?: Province;
  city?: City;
}

export interface VAuthConfirmEmailDetailParams {
  userId?: string;
  token?: string;
  version: string;
}

export interface CitiesDetailParams {
  provinceId: number;
}

export interface ProvinceDetailsResult {
  data: ProvinceDetail[]
}

export interface ProvinceDetail {
  name: string,
  cities: string | null,
  id: number,
  createdBy: string | null,
  createdDate: string,
  lastModifiedBy: string | null,
  lastModifiedDate: string | null,
  isDeleted: boolean,
  deletedDate: string | null
}

export interface CityDetailsResult {
  data: CityDetail[];
}

export interface CityDetail {
  name: string,
  provinceId: number,
  province: string | null,
  id: number,
  createdBy: string | null,
  createdDate: string,
  lastModifiedBy: string | null,
  lastModifiedDate: string | null,
  isDeleted: boolean,
  deletedDate: string | null
}

export interface LoginResult {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
  userId: string;
}
