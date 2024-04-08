import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import { useQuery } from "@tanstack/react-query";

export const MovieRoot = () => {
  const myNavigator = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["randomMovie", location.state.key],
    select: (data) => data.data,
  });
  console.log(data);
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
              {data.budget.value && data.budget.currency ? (
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
