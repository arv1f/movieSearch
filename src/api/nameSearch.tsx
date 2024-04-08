import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

const key = "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX";

export const useNameSearch = (name: string) => {
  const options = {
    method: "GET",
    url: `https://api.kinopoisk.dev/v1.4/movie/search`,
    params: { page: "1", limit: "10", query: name },
    headers: { accept: "application/json", "X-API-KEY": key },
  };
  return useQuery({
    queryKey: ["nameSearch", name],
    queryFn: () => axios.request(options),
    select: (data) => data.data,
  });
};
export const useRandomMovie = () => {
  const idList = [0];
  const options = {
    method: "GET",
    url: "https://api.kinopoisk.dev/v1.4/movie/random",
    params: { "rating.kp": "7.2-10" },
    headers: { accept: "application/json", "X-API-KEY": key },
  };
  return useQueries({
    queries: idList.map((id) => ({
      queryKey: ["randomMovie", id],
      queryFn: () => axios.request(options),
      select: (data) => data.data,
    })),
  });
};