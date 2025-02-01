import {
  ApiResponse,
  CitiesDetailParams, CityDetailsResult, ProvinceDetailsResult
} from "@/types";
import {http} from "../http";

export const cityApi = {
  provinces: () =>
    http.get<ApiResponse<ProvinceDetailsResult>>({
      url: "/api/v1/City/provinces"
    }),
  cities: (params: CitiesDetailParams) =>
    http.get<ApiResponse<CityDetailsResult>>({
      url: `/api/v1/City/cities/${params.provinceId}`
    })
};
