import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import { useQuery } from "@tanstack/react-query";

export const MovieRoot = () => {
  // const myNavigator = useNavigate();
  // const params = useParams();
  const location = useLocation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["randomMovie", location.state.key],
    select: (data) => data.data,
  });
  console.log(data);
  console.log(location.state);
  return <>{useParams().movieId}</>;
};
