import {
  ApiResponse,
  ForgotPasswordDto,
  LoginDto,
  LoginResult,
  RegisterDto,
  ResetPasswordDto,
  VAuthConfirmEmailDetailParams,
} from "@/types";
import {http} from "../http";

export const authApi = {
  register: (data: RegisterDto) =>
    http.post<ApiResponse<void>, RegisterDto>({
      url: "/api/v1/Auth/register",
      data,
    }),
  login: (data: LoginDto) =>
    http.post<ApiResponse<LoginResult>, LoginDto>({
      url: "/api/v1/Auth/login",
      data,
    }),
  forgotPassword: (data: ForgotPasswordDto) =>
    http.post<ApiResponse<void>, ForgotPasswordDto>({
      url: "/api/v1/Auth/forgot-password",
      data,
    }),
  resetPassword: (data: ResetPasswordDto) =>
    http.post<ApiResponse<void>, ResetPasswordDto>({
      url: "/api/v1/Auth/reset-password",
      data,
    }),
  confirmEmail: (params: VAuthConfirmEmailDetailParams) =>
    http.get<ApiResponse<void>, VAuthConfirmEmailDetailParams>({
      isSecure: true,
      url: "/api/v1/Auth/confirm-email",
      params
    }),
};
