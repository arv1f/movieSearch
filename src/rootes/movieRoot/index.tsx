import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import {
  useFilterList,
  useNameSearch,
  useRandomMovie,
} from "../../api/nameSearch";
import { useMainStore, useMovieRandomeStore } from "../../store";

// const useApi = (queryKey: string | number) => {
//   if (typeof queryKey === "number" && queryKey >= 0) {
//     // const { idList } = useMovieRandomeStore((state) => state);
//     // return useSearchId(idList[queryKey]);
//     const useRandomMovieList = useRandomMovie();
//     console.log(useRandomMovieList[queryKey], "useRandomMovieList[queryKey]");
//     return useRandomMovieList[queryKey];
//   } else {
//     if (typeof queryKey === "number" && queryKey <= 0) {
//       const location = useLocation();
//       const { data: useRandomMovieList } = useFilterList(
//         location.state.generes,
//       );
//       console.log(
//         useRandomMovieList.docs[queryKey * -1],
//         "useRandomMovieList.docs[queryKey * -1]",
//       );
//       return useRandomMovieList.docs[queryKey * -1];
//     } else {
//       console.log("nameSearch", queryKey);
//       return useNameSearch(queryKey);
//     }
//   }
// };

const useApi = (queryKey: number, type: string) => {
  if (type === "random") {
    console.log(0);
    const useRandomMovieList = useRandomMovie();
    return useRandomMovieList[queryKey];
  } else {
    if (type === "filter") {
      console.log(1);
      const location = useLocation();
      const { data: useRandomMovieList } = useFilterList(
        location.state.generes,
      );
      return useRandomMovieList.docs[queryKey];
    } else {
      console.log(2);
      return useNameSearch(type);
    }
  }
};

export const MovieRoot = () => {
  const myNavigator = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { setBackgroundUrl, backgroundUrl } = useMainStore((state) => state);
  console.log(params.movieId, location.state, location.state.key);
  const { data, isLoading, isError, error } = useApi(
    location.state.key ? params.movieId : location.state.key,
    location.state.type,
  );
  // const { data, isLoading, isError, error } = useApi(
  //   location.state === null
  //     ? params.movieId
  //     : location.state.url && location.state.url.includes("/filters/")
  //       ? location.state.key * -1
  //       : location.state.key,
  // );
  // console.log(data);
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
            <h6
              onClick={() => {
                if (
                  location.state.url &&
                  location.state.url.includes("/filters/")
                ) {
                  setBackgroundUrl("");
                  myNavigator(location.state.url);
                } else {
                  setBackgroundUrl("");
                  myNavigator("/");
                }
              }}
            >
              🠔
            </h6>
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
