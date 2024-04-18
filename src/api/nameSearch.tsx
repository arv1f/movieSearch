import axios from "axios";
import { useQueries, useQuery } from "@tanstack/react-query";

const key = "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX";

export interface Movie {
  map(
    arg0: (
      movie: {
        data: Movie;
        isLoading: boolean;
        isError: boolean;
        error: import("axios").AxiosError<unknown>;
      },
      index: number,
    ) => import("react/jsx-runtime").JSX.Element,
  ): import("react").ReactNode;
  id: number;
  name: string;
  alternativeName: string;
  year: number;
  description: string;
  shortDescription: string;
  rating: {
    kp: number;
    imdb: number;
  };
  type: string;
  poster: {
    url: string;
  };
  genres: { name: string }[];
  alternativeNameRu: string;
  shortDescriptionRu: string;
  descriptionRu: string;
  countries: { name: string }[];
  persons: { name: string; enName: string; description: string }[];
  ageRating: number;
}

export const useNameSearch = (name: string) => {
  const options = {
    method: "GET",
    url: `https://api.kinopoisk.dev/v1.4/movie/search`,
    params: { page: "1", limit: "1", query: name },
    headers: { accept: "application/json", "X-API-KEY": key },
  };
  return useQuery({
    queryKey: ["nameSearch", name],
    queryFn: () => axios.request(options),
    select: (data) => data.data.docs[0],
  });
};
export const useRandomMovie = (): {
  data: Movie | undefined;
  isLoading: boolean;
  isError: boolean;
  error: import("axios").AxiosError<unknown>;
} => {
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
      select: (data: { data: Movie }) => data.data,
      // keepPreviousData: true,
    })),
  });
};
export const useSearchId = (queryKey: number) => {
  return useQuery({
    queryKey: ["searchId", queryKey],
    queryFn: () => {
      const options = {
        method: "GET",
        url: `https://api.kinopoisk.dev/v1.4/movie/${queryKey}`,
        headers: { accept: "application/json", "X-API-KEY": key },
      };
      return axios.request(options);
    },
    select: (data) => data.data,
  });
};

export const useGeneresList = () => {
  return useQuery({
    queryKey: ["generesList"],
    queryFn: () => {
      const options = {
        method: "GET",
        url: "https://api.kinopoisk.dev/v1/movie/possible-values-by-field",
        params: { field: "genres.name" },
        headers: {
          accept: "application/json",
          "X-API-KEY": "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX",
        },
      };
      return axios.request(options);
    },
    select: (data) => data.data,
  });
};

export const useFilterList = (mylist: string[]) => {
  return useQuery({
    queryKey: ["filterList", mylist],
    queryFn: () => {
      const options = {
        method: "GET",
        url: "https://api.kinopoisk.dev/v1.4/movie",
        params: {
          page: "1",
          limit: "250",
          "genres.name": mylist.join("&genres.name="),
        },
        headers: {
          accept: "application/json",
          "X-API-KEY": "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX",
        },
      };
      return axios.request(options);
    },
    select: (data) => data.data,
  });
};

// export const useFilterOrRandomList = (mylist: string[]) => {
//   if (mylist.length > 0) {
//     const idList = [0];
//     const options = {
//       method: "GET",
//       url: "https://api.kinopoisk.dev/v1.4/movie/random",
//       params: { "rating.kp": "7.2-10" },
//       headers: { accept: "application/json", "X-API-KEY": key },
//     };
//     return useQueries({
//       queries: idList.map((id) => ({
//         queryKey: ["randomMovie", id],
//         queryFn: () => axios.request(options),
//         select: (data: { data: Movie }) => data.data,
//       })),
//     });
//   } else {
//     return useQuery({
//       queryKey: ["filterList", mylist],
//       queryFn: () => {
//         const options = {
//           method: "GET",
//           url: "https://api.kinopoisk.dev/v1.4/movie",
//           params: {
//             page: "1",
//             limit: "10",
//             "genres.name": mylist.join("&genres.name="),
//           },
//           headers: {
//             accept: "application/json",
//             "X-API-KEY": "XMNC75V-WMTMP7X-K9GTNHA-R9YK8VX",
//           },
//         };
//         return axios.request(options);
//       },
//       select: (data) => data.data,
//     });
//   }
// };
