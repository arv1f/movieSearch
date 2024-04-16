import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import { useNameSearch, useSearchId } from "../../api/nameSearch";
import { useMainStore, useMovieRandomeStore } from "../../store";

const useApi = (queryKey: string | number) => {
  if (typeof queryKey === "number") {
    const { idList } = useMovieRandomeStore((state) => state);
    console.log(idList);
    return useSearchId(idList[queryKey]);
  } else {
    return useNameSearch(queryKey);
  }
};

export const MovieRoot = () => {
  const myNavigator = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { setBackgroundUrl, backgroundUrl } = useMainStore((state) => state);
  const { data, isLoading, isError, error } = useApi(
    location.state === null ? params.movieId : location.state.key,
  );
  if (
    !isLoading &&
    data &&
    data.poster.url &&
    backgroundUrl !== data.poster.url
  ) {
    setBackgroundUrl(data.poster.url);
  }
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
                  {/* <h3
                    style={{ display: "inline", color: "var(--fg_main_blur)" }}
                  >
                    Бюджет{" "}
                  </h3> */}
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
