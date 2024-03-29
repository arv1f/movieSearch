import GetService from "../services/getService";
import { useQuery } from "@tanstack/react-query";

export const nameSearch = (name: string) => {
  return useQuery({
    queryKey: ["nameSearch", name],
    queryFn: async () =>
      GetService.searchData(
        { page: "1", limit: "10", query: name },
        "v1.4/movie/search",
      ),
    select: (data) => data.data,
  });
};
