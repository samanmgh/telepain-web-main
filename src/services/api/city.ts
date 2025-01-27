import {
  ApiResponse,
  CitiesDetailParams
} from "@/types";
import {http} from "../http";

export const cityApi = {
  provinces: () =>
    http.get<ApiResponse<void>>({
      url: "/api/v1/City/provinces"
    }),
  cities: (params: CitiesDetailParams) =>
    http.get<ApiResponse<void>, CitiesDetailParams>({
      url: "/api/v1/City/cities",
      params
    })
};
