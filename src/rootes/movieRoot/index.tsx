import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { useNameSearch } from "../../api/nameSearch";

const useApi = (queryKey: string | number) => {
  if (typeof queryKey === "number") {
    return useQuery({
      queryKey: ["randomMovie", queryKey],
      select: (data) => data.data,
    });
  } else {
    return useNameSearch(queryKey);
  }
};

export const MovieRoot = () => {
  const myNavigator = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { data, isLoading, isError, error } = useApi(
    location.state === null ? params.movieId : location.state.key,
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : data ? (
        <>
          <div className="mainContainer">
            <h6 onClick={() => myNavigator("/")}>🠔</h6>
            <img src={data.poster.url} />
            <div className="textContainer">
              <h1>
                {data.name ? data.name : data.alternativeName} ({data.year})
                {data.alternativeName === null ||
                data.alternativeName === undefined
                  ? data.ageRating
                    ? ` ${data.ageRating}+`
                    : ""
                  : ""}
              </h1>
              {data.alternativeName ? (
                <h2>
                  {data.alternativeName}{" "}
                  {data.ageRating ? `${data.ageRating}+` : ""}
                </h2>
              ) : (
                ""
              )}
              {data.countries ? (
                <h4>
                  {data.countries.map((el: { name: string }) => ` ${el.name},`)}
                </h4>
              ) : (
                ""
              )}
              {data.budget && data.budget.value && data.budget.currency ? (
                <h4>
                  <h3
                    style={{ display: "inline", color: "var(--fg_main_blur)" }}
                  >
                    Бюджет{" "}
                  </h3>
                  {data.budget.value}
                  {data.budget.currency}
                </h4>
              ) : (
                ""
              )}
              {data.genres ? (
                <h4>
                  {" "}
                  {data.genres.map(
                    (el: { name: string }) => ` ${el.name},`,
                  )}{" "}
                </h4>
              ) : (
                ""
              )}
              {data.description ? <p>{data.description}</p> : ""}
            </div>
          </div>
        </>
      ) : isError ? (
        error.message
      ) : null}
    </>
  );
};
