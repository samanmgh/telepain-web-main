import {
  ApiResponse,
  CarouselResult,
  ServiceResult,
  ServicesResult,
  SliderResult,
  UsageResult,
  UsagesResult
} from "@/types";
import { http } from "../http";

export const contentApi = {
  getSlider: () =>
    http.get<ApiResponse<SliderResult>>({url: "/content/slider"}),
  getServices: () =>
    http.get<ApiResponse<ServicesResult>>({url: "/content/services"}),
  getServiceByKey: ({serviceKey}: {serviceKey: string}) =>
    http.get<ApiResponse<ServiceResult>>({url: `/content/service/${serviceKey}`}),
  getUsagesByServiceKey: ({serviceKey}: {serviceKey: string}) =>
    http.get<ApiResponse<UsagesResult>>({url: `/content/usages/${serviceKey}`}),
  getUsageByKey: ({usageKey}: {usageKey: string}) =>
    http.get<ApiResponse<UsageResult>>({url: `/content/usage/${usageKey}`}),
  getCarouselByKey: ({usageKey}: {usageKey: string}) =>
    http.get<ApiResponse<CarouselResult>>({url: `/content/carousel/${usageKey}`}),
};
